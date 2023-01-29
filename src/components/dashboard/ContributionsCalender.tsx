import { theme, css, styled } from "@/theme";

import Calendar from "@/components/dashboard/GithubCalendar";
import { Divider } from "@/components/layout";
import { Heading, ImportantContainer, Paragraph } from "@/components/ui";

import type { GitHubContributionsCalendar } from "@/data/contributionsCalendar";

import dayjs from "dayjs";

interface ContributionsCalendarProps {
    data: GitHubContributionsCalendar;
}

export default function ContributionsCalendar({ data }: ContributionsCalendarProps) {
    const transformed: Record<string, number> = Object.fromEntries(
        data.map(({ date, count }) => [date, count])
    );

    const until = dayjs().format("YYYY-MM-DD");

    const sum = data.reduce((acc, { count }) => acc + count, 0);

    return (
        <ContributionsContainer>
            <Heading as="h3">Contributions Calendar</Heading>
            <Paragraph>{`I've made ${sum.toLocaleString()} contributions in the last year`}</Paragraph>
            <Divider />
            <Calendar
                values={transformed}
                panelColors={[
                    "rgba(255, 255, 255, 0.1)",
                    `rgba(${theme.colors["brand-primary-rgb"].computedValue}, 0.15)`,
                    `rgba(${theme.colors["brand-primary-rgb"].computedValue}, 0.3)`,
                    `rgba(${theme.colors["brand-primary-rgb"].computedValue}, 0.45)`,
                    `rgba(${theme.colors["brand-primary-rgb"].computedValue}, 0.7)`,
                ]}
                until={until}
                weekLabelAttributes={{ className: String(labelStyles) }}
                monthLabelAttributes={{ className: String(labelStyles) }}
                panelAttributes={{ className: String(panelStyles) }}
            />
        </ContributionsContainer>
    );
}

const labelStyles = css({
    fontFamily: "$text",
    fontWeight: 800,
    color: "$text-primary",
});

const panelStyles = css({
    rx: "$radii$sm",
    ry: "$radii$sm",
});

const ContributionsContainer = styled(ImportantContainer, {
    maxWidth: 756,
    flexDirection: "column",
    width: "100%",
    height: "min-content",
});
