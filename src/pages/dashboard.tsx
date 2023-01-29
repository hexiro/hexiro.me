import { styled } from "@/theme";

import type { GetStaticProps } from "next";

import ContributionsCalendar from "@/components/ContributionsCalender";
import { Heading, Paragraph } from "@/components/ui";
import contributionsCalendar from "@/data/contributionsCalendar";
import wakatimeStats from "@/data/wakatimeStats";
import Page from "@/layout/Page";

const DESCRIPTION = "Dashboard";

interface DashboardPageProps {
    contributionsCalendar: Awaited<ReturnType<typeof contributionsCalendar>>;
    wakatimeStats: Awaited<ReturnType<typeof wakatimeStats>>;
}

export default function Dashboard({ contributionsCalendar, wakatimeStats }: DashboardPageProps) {
    return (
        <Page name="Dashboard" description={DESCRIPTION}>
            <TextContainer>
                <Heading as="h1">Dashboard</Heading>
                <Paragraph size="lg">
                    This dashboard is a collection of statistics related to myself and programming.
                </Paragraph>
            </TextContainer>
            <SectionsContainer>
                <ContributionsCalendar data={contributionsCalendar} />
                {/* <ProgrammingTimeStats
                    dailyAverage={wakatimeStats.dailyAverageDuration}
                    last7Days={wakatimeStats.last7daysDuration}
                /> */}
            </SectionsContainer>
        </Page>
    );
}

const TextContainer = styled("div", {
    marginBottom: "$6",
});

const SectionsContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "$4",
});

export const getStaticProps: GetStaticProps<DashboardPageProps> = async () => ({
    props: {
        contributionsCalendar: await contributionsCalendar(),
        wakatimeStats: await wakatimeStats(),
    },
});
