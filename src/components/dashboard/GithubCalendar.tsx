/**
 * original code source from:
 * https://github.com/haripo/react-github-contribution-calendar/
 * modified by: @hexiro
 * modified date: 2023-28-01
 * modified to support typescript better & have tooltips
 */
import type { ReactElement, SVGProps } from "react";
import React from "react";

import dayjs from "dayjs";
import type { BoundingRect } from "react-measure";
import Measure from "react-measure";

interface Props {
    values: Record<string, number>;
    until: string;
    weekNames?: string[];
    monthNames?: string[];
    panelColors?: string[];
    dateFormat?: string;
    weekLabelAttributes?: SVGProps<SVGTextElement>;
    monthLabelAttributes?: SVGProps<SVGTextElement>;
    panelAttributes?: SVGProps<SVGRectElement>;
}

interface State {
    rows: number;
    columns: number;
    maxWidth: number;
}

export default class GitHubCalendar extends React.Component<Props, State> {
    monthLabelHeight: number;
    weekLabelWidth: number;
    panelSize: number;
    panelMargin: number;
    state: State;

    static get defaultProps() {
        return {
            weekNames: ["", "M", "", "W", "", "F", ""],
            monthNames: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            panelColors: ["#EEE", "#DDD", "#AAA", "#444"],
            dateFormat: "YYYY-MM-DD",
            weekLabelAttributes: undefined,
            monthLabelAttributes: undefined,
            panelAttributes: undefined,
        };
    }

    constructor(props: Props) {
        super(props);

        this.monthLabelHeight = 15;
        this.weekLabelWidth = 15;
        this.panelSize = 11;
        this.panelMargin = 2;

        this.state = {
            rows: 7,
            columns: 53,
            maxWidth: 53,
        };
    }

    getPanelPosition(row: number, col: number): { x: number; y: number } {
        const bounds = this.panelSize + this.panelMargin;
        return {
            x: this.weekLabelWidth + bounds * row,
            y: this.monthLabelHeight + bounds * col,
        };
    }

    getPanelColor(value: number): string {
        const { panelColors } = this.props;
        if (!panelColors) return "#fff";

        const numOfColors = panelColors.length;
        const color = value >= numOfColors ? panelColors[numOfColors - 1] : panelColors[value];
        return color;
    }

    makeCalendarData(
        history: Record<string, number>,
        lastDay: string,
        columns: number,
        rows: number
    ) {
        const { dateFormat } = this.props;
        const date = dayjs(lastDay, { format: dateFormat });
        const lastDate = date.endOf("week");
        const startDate = date.endOf("day");

        type Day = { value: number; month: number } | null;
        type Week = Day[];
        type Calendar = Week[];

        const result: Calendar = Array.from({ length: columns }, () => Array(rows));

        for (let week = 0; week < columns; week++) {
            for (let day = 0; day < rows; day++) {
                // start at end and remove days until start date is reached
                const currentDate = lastDate
                    .subtract(columns - week - 1, "week")
                    .subtract(rows - day - 1, "day");

                if (currentDate <= startDate) {
                    const formatted = currentDate.format(dateFormat);
                    const value = history[formatted] || 0;
                    result[week][day] = {
                        value,
                        month: currentDate.month(),
                    };
                } else {
                    result[week][day] = null;
                }
            }
        }

        return result;
    }

    render() {
        const { columns, rows } = this.state;
        const { values, until } = this.props;

        if (!this.props.panelColors || !this.props.weekNames || !this.props.monthNames) return;

        const contributions = this.makeCalendarData(values, until, columns, rows);
        const innerDom: ReactElement[] = [];

        // panels
        for (let weekIndex = 0; weekIndex < columns; weekIndex++) {
            const week = contributions[weekIndex];
            for (let dayIndex = 0; dayIndex < week.length; dayIndex++) {
                const contribution = week[dayIndex];
                if (!contribution) continue;

                const pos = this.getPanelPosition(weekIndex, dayIndex);
                const color = this.getPanelColor(contribution.value);

                const el = (
                    <rect
                        key={`panel_key_${weekIndex}_${dayIndex}`}
                        width={this.panelSize}
                        height={this.panelSize}
                        fill={color}
                        {...pos}
                        {...this.props.panelAttributes}
                    />
                );
                innerDom.push(el);
            }
        }

        // week texts
        for (let i = 0; i < this.props.weekNames.length; i++) {
            const textBasePos = this.getPanelPosition(0, i);
            const dom = (
                <text
                    key={`week_key_${i}`}
                    style={{
                        fontSize: 9,
                        alignmentBaseline: "central",
                        fill: "#AAA",
                    }}
                    x={textBasePos.x - this.panelSize / 2 - 2}
                    y={textBasePos.y + this.panelSize / 2}
                    textAnchor="middle"
                    {...this.props.weekLabelAttributes}
                >
                    {this.props.weekNames[i]}
                </text>
            );
            innerDom.push(dom);
        }

        // month texts
        let prevMonth = -1;
        for (let i = 0; i < columns; i++) {
            const c = contributions[i][0];
            if (c === null) continue;
            if (columns > 1 && i === 0 && c.month !== contributions[i + 1][0]?.month) {
                // skip first month name to avoid text overlap
                continue;
            }

            if (c.month !== prevMonth) {
                const textBasePos = this.getPanelPosition(i, 0);
                innerDom.push(
                    <text
                        key={`month_key_${i}`}
                        style={{
                            fontSize: 10,
                            alignmentBaseline: "central",
                            fill: "#AAA",
                        }}
                        x={textBasePos.x + this.panelSize / 2}
                        y={textBasePos.y - this.panelSize / 2 - 2}
                        textAnchor="middle"
                        {...this.props.monthLabelAttributes}
                    >
                        {this.props.monthNames[c.month]}
                    </text>
                );
            }

            prevMonth = c.month;
        }

        return (
            // @ts-expect-error react being weird
            <Measure bounds onResize={(rect) => this.updateSize(rect.bounds)}>
                {({ measureRef }) => (
                    <div ref={measureRef} style={{ width: "100%" }}>
                        <svg
                            style={{
                                fontFamily:
                                    "Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif",
                                width: "100%",
                            }}
                            height="110"
                        >
                            {innerDom}
                        </svg>
                    </div>
                )}
            </Measure>
        );
    }

    updateSize(size?: BoundingRect) {
        if (!size) return;

        const visibleWeeks = Math.floor((size.width - this.weekLabelWidth) / 13);
        this.setState((prevState) => ({
            columns: Math.min(visibleWeeks, prevState.maxWidth),
        }));
    }
}
