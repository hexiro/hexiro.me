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

interface HomePageProps {
    projects: ProjectData[];
}

const inViewOptions: NonNullable<Parameters<typeof useInView>[1]> = {
    amount: 0.3,
};

export default function HomePage({ projects }: HomePageProps) {
    console.log("Index");

    const homeRef = useRef<HTMLDivElement>(null);
    const homeInView = useInView(homeRef, inViewOptions);
    const projectsRef = useRef<HTMLDivElement>(null);
    const projectsInView = useInView(projectsRef, inViewOptions);

    const [, setSelectedRouteIndexAtom] = useAtom(selectedRouteIndexAtom);

    useIsomorphicLayoutEffect(() => {
        const inViews = [homeInView, projectsInView];

        for (let i = inViews.length - 1; i >= 0; i--) {
            if (inViews[i]) {
                setSelectedRouteIndexAtom(i);
                break;
            }
        }
    }, [homeInView, projectsInView]);

    return (
        <>
            <Home ref={homeRef} />
            <Projects ref={projectsRef} projects={projects} />
        </>
    );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => ({
    props: {
        projects: await projects(),
    },
    revalidate: 60 * 60,
});
