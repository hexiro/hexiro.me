import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { Heading, Paragraph } from "@/components/ui";

import ContributionsCalendar from "@/components/dashboard/ContributionsCalender";
import ProgrammingTimeStats from "@/components/dashboard/ProgrammingTimeStats";
import TopLanguages from "@/components/dashboard/TopLanguages";

import type contributionsCalendar from "@/data/contributionsCalendar";
import type wakatimeStats from "@/data/wakatimeStats";

import Section from "@/layout/Section";

export interface DashboardProps {
    contributionsCalendar: Awaited<ReturnType<typeof contributionsCalendar>>;
    wakatimeStats: Awaited<ReturnType<typeof wakatimeStats>>;
}

const NAME = "Dashboard";
const DESCRIPTION =
    "This dashboard is a collection of statistics related to myself and programming.";
const INDEX = 2;

const Dashboard = forwardRef<HTMLElement, DashboardProps>(
    ({ contributionsCalendar, wakatimeStats }, ref) => {
        console.log("Dashboard");
        return (
            <Section ref={ref} name={NAME} description={DESCRIPTION} index={INDEX}>
                <TextContainer>
                    <Heading as="h1">{NAME}</Heading>
                    <Paragraph size="lg">{DESCRIPTION}</Paragraph>
                </TextContainer>
                <SectionsContainer>
                    <ContributionsCalendar data={contributionsCalendar} />
                    <ProgrammingTimeStats
                        dailyAverage={wakatimeStats.dailyAverageDuration}
                        last7Days={wakatimeStats.last7daysDuration}
                    />
                    <TopLanguages languages={wakatimeStats.languages} />
                </SectionsContainer>
            </Section>
        );
    }
);

export default memo(Dashboard);

const TextContainer = styled("div", {
    marginBottom: "$6",
});

const SectionsContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "$4",
});
