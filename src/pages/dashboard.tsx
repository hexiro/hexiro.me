import { styled } from "@/theme";

import type { GetStaticProps } from "next";

import ContributionsCalendar from "@/components/ContributionsCalender";
import { Heading, Paragraph } from "@/components/ui";
import type { GitHubContributionsCalendar } from "@/data/contributionsCalendar";
import contributionsCalendar from "@/data/contributionsCalendar";
import Page from "@/layout/Page";

const DESCRIPTION = "Dashboard";

interface DashboardPageProps {
    contributionsCalendar: GitHubContributionsCalendar;
}

export default function Dashboard({ contributionsCalendar }: DashboardPageProps) {
    return (
        <Page name="Dashboard" description={DESCRIPTION}>
            <TextContainer>
                <Heading as="h1">Dashboard</Heading>
                <Paragraph size="lg">
                    This dashboard is a collection of statistics related to myself and programming.
                </Paragraph>
            </TextContainer>
            <ContributionsCalendar data={contributionsCalendar} />
        </Page>
    );
}

const TextContainer = styled("div", {
    marginBottom: "$6",
});

export const getStaticProps: GetStaticProps<DashboardPageProps> = async () => ({
    props: {
        contributionsCalendar: await contributionsCalendar(),
    },
});
