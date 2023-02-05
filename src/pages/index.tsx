import type { GetStaticProps } from "next";
import { useRef } from "react";

import type { ProjectData } from "@/commons/graphql/projects";
import projects from "@/commons/graphql/projects";

import useUpdateNavState from "@/hooks/useUpdateNavState";
import Home from "@/layout/Home";
import Projects from "@/layout/Projects";

interface IndexPageProps {
    projects: ProjectData[];
}

export default function IndexPage({ projects }: IndexPageProps) {
    console.log("Index");

    const homeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);

    useUpdateNavState({ homeRef, projectsRef });

    return (
        <>
            <Home ref={homeRef} />
            <Projects ref={projectsRef} projects={projects} />
        </>
    );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
    props: {
        projects: await projects(),
    },
    revalidate: 60 * 60,
});
