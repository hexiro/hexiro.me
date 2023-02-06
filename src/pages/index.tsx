import type { GetStaticProps } from "next";
import { useRef } from "react";

import projects from "@/commons/graphql/projects";

import contributionsCalendar from "@/data/contributionsCalendar";
import wakatimeStats from "@/data/wakatimeStats";

import useUpdateNavState from "@/hooks/useUpdateNavState";
import type { DashboardProps } from "@/layout/Dashboard";
import Dashboard from "@/layout/Dashboard";
import Home from "@/layout/Home";
import type { ProjectsProps } from "@/layout/Projects";
import Projects from "@/layout/Projects";

type IndexPageProps = ProjectsProps & DashboardProps;

export default function IndexPage({
    projects,
    contributionsCalendar,
    wakatimeStats,
}: IndexPageProps) {
    console.log("Index");

    const homeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const dashboardRef = useRef<HTMLElement>(null);

    useUpdateNavState(homeRef, projectsRef, dashboardRef);

    return (
        <>
            <Home ref={homeRef} />
            <Projects ref={projectsRef} projects={projects} />
            <Dashboard
                ref={dashboardRef}
                contributionsCalendar={contributionsCalendar}
                wakatimeStats={wakatimeStats}
            />
        </>
    );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
    props: {
        projects: await projects(),
        contributionsCalendar: await contributionsCalendar(),
        wakatimeStats: await wakatimeStats(),
    },
    revalidate: 60 * 60,
});

// export const getStaticProps: GetStaticProps<DashboardPageProps> = async () => ({
//     props: {

//     },
//     revalidate: 60 * 60 * 6,
// });
