/**
 * original code source from:
 * https://github.com/haripo/react-github-contribution-calendar/
 * modified by: @hexiro
 * modified date: 2023-28-01
 * modified to support typescript better & have tooltips
 */
import { styled } from "@/theme";

import type { MouseEventHandler, ReactElement, SVGProps } from "react";
import { useMemo } from "react";
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

type Day = { value: number; month: number; date: dayjs.Dayjs } | null;
type Week = Day[];
type Calendar = Week[];

const monthLabelHeight = 15;
const weekLabelWidth = 15;
const panelSize = 11;
const panelMargin = 2;
const rows = 7;
const maxWidth = 53;

const defaultWeekNames = ["", "M", "", "W", "", "F", ""];
const defaultMonthNames = [
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
];
const defaultPanelColors = ["#EEE", "#DDD", "#AAA", "#444"];
const defaultDateFormat = "YYYY-MM-DD";

export default function GitHubCalendar({
    values,
    until,
    weekNames = defaultWeekNames,
    monthNames = defaultMonthNames,
    panelColors = defaultPanelColors,
    dateFormat = defaultDateFormat,
    weekLabelAttributes = undefined,
    monthLabelAttributes = undefined,
    panelAttributes = undefined,
}: Props) {
    const [columns, setColumns] = useState<number>(53);
    const [tooltip, setTooltip] = useState<{
        element: SVGRectElement;
        position: { left: number; top: number };
    } | null>(null);

    const getPanelPosition = useCallback((row: number, col: number) => {
        const bounds = panelSize + panelMargin;
        return {
            x: weekLabelWidth + bounds * row,
            y: monthLabelHeight + bounds * col,
        };
    }, []);

    const getPanelColor = useCallback(
        (value: number) => {
            const numOfColors = panelColors.length;
            const color = value >= numOfColors ? panelColors[numOfColors - 1] : panelColors[value];
            return color;
        },
        [panelColors]
    );

    const updateSize = useCallback((size?: BoundingRect) => {
        if (!size) return;

        const visibleWeeks = Math.floor((size.width - weekLabelWidth) / 13);

        setColumns(Math.min(visibleWeeks, maxWidth));
    }, []);

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
                        date: currentDate,
                        month: currentDate.month(),
                    };
                } else {
                    result[week][day] = null;
                }
            }
        }

        return result;
    }, [columns, values, until, dateFormat]);

    const constructInnerSVG = useCallback(
        (contributions: Calendar) => {
            const innerDom: ReactElement[] = [];

            // panels

            for (const [weekIndex, week] of contributions.entries()) {
                for (const [dayIndex, day] of week.entries()) {
                    if (!day) continue;

                    const pos = getPanelPosition(weekIndex, dayIndex);
                    const color = getPanelColor(day.value);

                    const stringCount = day.value > 0 ? String(day.value) : "No";

                    const el = (
                        <rect
                            key={`panel_key_${weekIndex}_${dayIndex}`}
                            width={panelSize}
                            height={panelSize}
                            fill={color}
                            {...pos}
                            {...panelAttributes}
                        >
                            {`${stringCount} contributions on ${day.date.format("MMMM D, YYYY")}`}
                        </rect>
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
            panelAttributes,
            weekNames,
            weekLabelAttributes,
            monthLabelAttributes,
            monthNames,
        ]
    );

    const contributions = useMemo(() => makeCalendarData(), [makeCalendarData]);
    const innerDom = useMemo(
        () => constructInnerSVG(contributions),
        [constructInnerSVG, contributions]
    );

    const handleMouseEnter: MouseEventHandler<SVGSVGElement> = useCallback((e) => {
        const { target: element } = e;
        if (!(element instanceof SVGRectElement)) return;

        const rect = element.getBoundingClientRect();

        const left = rect.x + rect.width / 2;
        const top = rect.y - 4;

        const position = { left, top };

        setTooltip({ element, position });
    }, []);

    const handleMouseLeave: MouseEventHandler<SVGSVGElement> = useCallback(() => {
        setTooltip(null);
    }, []);

    const Calendar = useMemo(
        () => (
            // @ts-expect-error react-measure types being weird?
            <Measure bounds onResize={(rect) => updateSize(rect.bounds)}>
                {({ measureRef }) => (
                    <div ref={measureRef} style={{ position: "relative", width: "100%" }}>
                        <svg
                            height={110}
                            style={{ width: "100%" }}
                            onMouseOver={handleMouseEnter}
                            onMouseOut={handleMouseLeave}
                        >
                            {innerDom}
                        </svg>
                    </div>
                )}
            </Measure>
        ),
        [handleMouseEnter, handleMouseLeave, innerDom, updateSize]
    );

    return (
        <>
            {Calendar}
            {tooltip ? (
                <TooltipWrapper css={{ ...tooltip.position }}>
                    {tooltip.element.textContent}
                </TooltipWrapper>
            ) : null}
        </>
    );
}

const TooltipWrapper = styled("div", {
    position: "fixed",
    color: "$text-primary",
    fontWeight: 500,
    borderRadius: "4px",
    // fontSize: "0.95rem",
    // padding: "0.4rem 0.8rem",
    textAlign: "center",
    backgroundColor: "$tippy-tooltip-color",
    border: "2px solid rgba(255, 255, 255, 0.15)",
    transform: "translateY(-100%) translateX(-50%)",

    padding: "0.25rem 0.5rem",
    fontSize: "0.8rem",
});
