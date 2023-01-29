/**
 * original code source from:
 * https://github.com/haripo/react-github-contribution-calendar/
 * modified by: @hexiro
 * modified date: 2023-28-01
 * modified to support typescript better & have tooltips
 */
import type { ReactElement, SVGProps } from "react";
import { useCallback } from "react";
import { useState } from "react";
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

type Day = { value: number; month: number } | null;
type Week = Day[];
type Calendar = Week[];

export default function GithubCalendar({
    values,
    until,
    weekNames = ["", "M", "", "W", "", "F", ""],
    monthNames = [
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
    panelColors = ["#EEE", "#DDD", "#AAA", "#444"],
    dateFormat = "YYYY-MM-DD",
    weekLabelAttributes = undefined,
    monthLabelAttributes = undefined,
    panelAttributes = undefined,
}: Props) {
    const [rows, setRows] = useState<number>(7);
    const [columns, setColumns] = useState<number>(53);
    const [maxWidth, setMaxWidth] = useState<number>(53);

    const monthLabelHeight = 15;
    const weekLabelWidth = 15;
    const panelSize = 11;
    const panelMargin = 2;

    const getPanelPosition = useCallback(
        (row: number, col: number) => {
            const bounds = panelSize + panelMargin;
            return {
                x: weekLabelWidth + bounds * row,
                y: monthLabelHeight + bounds * col,
            };
        },
        [panelSize, panelMargin, weekLabelWidth, monthLabelHeight]
    );

    const getPanelColor = useCallback(
        (value: number) => {
            const numOfColors = panelColors.length;
            const color = value >= numOfColors ? panelColors[numOfColors - 1] : panelColors[value];
            return color;
        },
        [panelColors]
    );

    const updateSize = useCallback(
        (size?: BoundingRect) => {
            if (!size) return;

            const visibleWeeks = Math.floor((size.width - weekLabelWidth) / 13);

            setColumns(Math.min(visibleWeeks, maxWidth));
        },
        [weekLabelWidth, maxWidth]
    );

    const makeCalendarData = useCallback(() => {
        const date = dayjs(until, { format: dateFormat });
        const lastDate = date.endOf("week");
        const startDate = date.endOf("day");

        const result: Calendar = Array.from({ length: columns }, () => Array(rows));

        for (let week = 0; week < columns; week++) {
            for (let day = 0; day < rows; day++) {
                // start at end and remove days until start date is reached
                const currentDate = lastDate
                    .subtract(columns - week - 1, "week")
                    .subtract(rows - day - 1, "day");

                if (currentDate <= startDate) {
                    const formatted = currentDate.format(dateFormat);
                    const value = values[formatted] || 0;
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
    }, [columns, rows, values, until, dateFormat]);

    const constructInnerSVG = useCallback(
        (contributions: Calendar) => {
            const innerDom: ReactElement[] = [];

            // panels

            for (const [weekIndex, week] of contributions.entries()) {
                for (const [dayIndex, day] of week.entries()) {
                    if (!day) continue;

                    const pos = getPanelPosition(weekIndex, dayIndex);
                    const color = getPanelColor(day.value);

                    const el = (
                        <rect
                            key={`panel_key_${weekIndex}_${dayIndex}`}
                            width={panelSize}
                            height={panelSize}
                            fill={color}
                            {...pos}
                            {...panelAttributes}
                        />
                    );
                    innerDom.push(el);
                }
            }

            // week texts
            for (const [weekIndex, weekName] of weekNames.entries()) {
                const textBasePos = getPanelPosition(0, weekIndex);
                const el = (
                    <text
                        key={`week_key_${weekIndex}`}
                        style={{
                            fontSize: 9,
                            alignmentBaseline: "central",
                            fill: "#AAA",
                        }}
                        x={textBasePos.x - panelSize / 2 - 2}
                        y={textBasePos.y + panelSize / 2}
                        textAnchor="middle"
                        {...weekLabelAttributes}
                    >
                        {weekName}
                    </text>
                );
                innerDom.push(el);
            }

            // month texts (set to 0 to skip first month)
            let prevMonth = 0;
            for (const [weekIndex, week] of contributions.entries()) {
                const day = week[0];
                if (!day) continue;

                if (day.month !== prevMonth) {
                    const textBasePos = getPanelPosition(weekIndex, 0);
                    const el = (
                        <text
                            key={`month_key_${weekIndex}`}
                            style={{
                                fontSize: 10,
                                alignmentBaseline: "central",
                                fill: "#AAA",
                            }}
                            x={textBasePos.x + panelSize / 2}
                            y={textBasePos.y - panelSize / 2 - 2}
                            textAnchor="middle"
                            {...monthLabelAttributes}
                        >
                            {monthNames[day.month]}
                        </text>
                    );
                    innerDom.push(el);
                }

                prevMonth = day.month;
            }

            return innerDom;
        },
        [
            getPanelPosition,
            getPanelColor,
            panelSize,
            weekNames,
            monthNames,
            weekLabelAttributes,
            monthLabelAttributes,
            panelAttributes,
        ]
    );

    const contributions = makeCalendarData();
    const innerDom = constructInnerSVG(contributions);

    return (
        // @ts-expect-error react being weird
        <Measure bounds onResize={(rect) => updateSize(rect.bounds)}>
            {({ measureRef }) => (
                <div ref={measureRef} style={{ position: "relative", width: "100%" }}>
                    <svg height={110} style={{ width: "100%" }}>
                        {innerDom}
                    </svg>
                </div>
            )}
        </Measure>
    );
}
