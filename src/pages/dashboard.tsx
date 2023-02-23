import type { GetStaticProps } from "next";

import BrandedBoxContainer from "@/components/BrandedBoxContainer";
import ContributionsCalendar from "@/components/dashboard/ContributionsCalender";
import TopLanguages from "@/components/dashboard/LanguageActivity";
import ProgrammingActivity from "@/components/dashboard/ProgrammingActivity";

import fetchContributionsCalendar from "@/data/contributionsCalendar";
import fetchWakatimeStats from "@/data/wakatimeStats";

import Page from "@/layout/Page";

interface DashboardProps {
    contributionsCalendar: Awaited<ReturnType<typeof fetchContributionsCalendar>>;
    wakatimeStats: Awaited<ReturnType<typeof fetchWakatimeStats>>;
}

const NAME = "Dashboard";
const DESCRIPTION =
    "This dashboard is a collection of statistics related to myself and programming.";

export default function DashboardPage({ wakatimeStats, contributionsCalendar }: DashboardProps) {
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <BrandedBoxContainer>
                <ProgrammingActivity
                    dailyAverage={wakatimeStats.dailyAverageDuration}
                    last7Days={wakatimeStats.last7daysDuration}
                />
                <TopLanguages languages={wakatimeStats.languages} />
                <ContributionsCalendar data={contributionsCalendar} />
            </BrandedBoxContainer>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<DashboardProps> = async () => ({
    props: {
        contributionsCalendar: await fetchContributionsCalendar(),
        wakatimeStats: await fetchWakatimeStats(),
    },
    revalidate: 60 * 60,
});
