import type { GetStaticProps } from "next";

import ContributionsCalendar from "@/components/ContributionsCalender";
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
            <ContributionsCalendar data={contributionsCalendar} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<DashboardPageProps> = async () => ({
    props: {
        contributionsCalendar: await contributionsCalendar(),
    },
});
