import { css } from "@/theme";

import type { GitHubContributionsCalendar } from "@/data/contributionsCalendar";

import Calendar from "react-github-contribution-calendar";

interface ContributionsCalendarProps {
    data: GitHubContributionsCalendar;
}

export default function ContributionsCalendar({ data }: ContributionsCalendarProps) {
    const transformed: Record<string, number> = Object.fromEntries(
        data.map(({ date, count }) => [date, count])
    );

    const today = new Date();
    const until = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    return (
        <Calendar
            values={transformed}
            panelColors={["#eeeeee", "#d6e685", "#8cc665", "#44a340", "#1e6823"]}
            until={until}
            weekLabelAttributes={{ className: String(labelStyles) }}
            monthLabelAttributes={{ className: String(labelStyles) }}
            panelAttributes={{ className: String(panelStyles) }}
        />
    );
}

const labelStyles = css({
    fontFamily: "$text",
    fontWeight: 600,
    color: "$text-primary",
});

const panelStyles = css({
    rx: "$radii$sm",
    ry: "$radii$sm",
});
