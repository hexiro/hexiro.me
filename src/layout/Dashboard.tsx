import { forwardRef, memo } from "react";

import BrandedBoxContainer from "@/components/BrandedBoxContainer";
import ContributionsCalendar from "@/components/dashboard/ContributionsCalender";
import TopLanguages from "@/components/dashboard/LanguageActivity";
import ProgrammingActivity from "@/components/dashboard/ProgrammingActivity";

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

const Dashboard = forwardRef<HTMLElement, DashboardProps>(
    ({ contributionsCalendar, wakatimeStats }, ref) => (
        <Section ref={ref} name={NAME} description={DESCRIPTION}>
            <BrandedBoxContainer>
                <ProgrammingActivity
                    dailyAverage={wakatimeStats.dailyAverageDuration}
                    last7Days={wakatimeStats.last7daysDuration}
                />
                <TopLanguages languages={wakatimeStats.languages} />
                <ContributionsCalendar data={contributionsCalendar} />
            </BrandedBoxContainer>
        </Section>
    )
);

export default memo(Dashboard);
