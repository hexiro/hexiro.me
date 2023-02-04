import type { GetStaticProps } from "next";
import { useRef } from "react";

import { selectedRouteIndexAtom } from "@/commons/atoms";
import type { ProjectData } from "@/commons/graphql/projects";
import projects from "@/commons/graphql/projects";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import Home from "@/layout/Home";
import Projects from "@/layout/Projects";

import { useInView } from "framer-motion";
import { useAtom } from "jotai";

interface IndexPageProps {
    projects: ProjectData[];
}

const inViewOptions: NonNullable<Parameters<typeof useInView>[1]> = {
    amount: 0.3,
};

export default function IndexPage({ projects }: IndexPageProps) {
    console.log("Index");

    const homeRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    const homeInView = useInView(homeRef, inViewOptions);
    const projectsInView = useInView(projectsRef, inViewOptions);

    const [selectedRouteIndex, setSelectedRouteIndex] = useAtom(selectedRouteIndexAtom);

    useIsomorphicLayoutEffect(() => {
        const inViews = [homeInView, projectsInView];

        for (let i = inViews.length - 1; i >= 0; i--) {
            if (inViews[i]) {
                setSelectedRouteIndex(i);
                break;
            }
        }
    }, [homeInView, projectsInView]);

    return (
        <>
            <Home ref={homeRef} isSelected={selectedRouteIndex === 0} />
            <Projects ref={projectsRef} projects={projects} isSelected={selectedRouteIndex === 1} />
        </>
    );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => ({
    props: {
        projects: await projects(),
    },
    revalidate: 60 * 60,
});
