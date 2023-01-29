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

    makeCalendarData(history: Record<string, number>, lastDay: string, columns: number) {
        const date = dayjs(lastDay, { format: this.props.dateFormat });
        const lastDate = date.endOf("week");
        const startDate = date.endOf("day");

        type DayValue = { value: number; month: number } | null;
        type Week = DayValue[];
        type Calendar = Week[];

        const result: Calendar = Array.from({ length: 53 }, () => Array(7));
        for (let week = 0; week < columns; week++) {
            for (let day = 0; day < 7; day++) {
                // start at end and remove days until start date is reached
                const currentDate = lastDate
                    .subtract(columns - week - 1, "week")
                    .subtract(6 - day, "day");

                if (currentDate <= startDate) {
                    const formatted = currentDate.format(this.props.dateFormat);
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
        const { columns } = this.state;
        const { values } = this.props;
        const { until } = this.props;

        if (
            this.props.panelColors === undefined ||
            this.props.weekNames === undefined ||
            this.props.monthNames === undefined
        ) {
            return;
        }

        const contributions = this.makeCalendarData(values, until, columns);
        const innerDom: ReactElement[] = [];

        // panels
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < 7; j++) {
                const contribution = contributions[i][j];
                if (contribution === null) continue;
                const pos = this.getPanelPosition(i, j);
                const numOfColors = this.props.panelColors.length;
                const color =
                    contribution.value >= numOfColors
                        ? this.props.panelColors[numOfColors - 1]
                        : this.props.panelColors[contribution.value];
                const dom = (
                    <rect
                        key={`panel_key_${i}_${j}`}
                        x={pos.x}
                        y={pos.y}
                        width={this.panelSize}
                        height={this.panelSize}
                        fill={color}
                        {...this.props.panelAttributes}
                    />
                );
                innerDom.push(dom);
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
