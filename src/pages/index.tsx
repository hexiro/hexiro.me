import type { GetStaticProps } from "next";
import { useRef } from "react";

import { TWITTER_LINK, GITHUB_LINK, LINKED_IN_LINK } from "@/commons/config";
import type { ProjectData } from "@/commons/graphql/projects";
import projects from "@/commons/graphql/projects";
import { HomeIcon, ProjectsIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from "@/commons/icons";

import Home from "@/layout/Home";
import type { NavRoute, SocialRoute } from "@/layout/Nav";
import Nav from "@/layout/Nav";
import Projects from "@/layout/Projects";

import { useInView } from "framer-motion";

interface HomePageProps {
    projects: ProjectData[];
}

export default function HomePage({ projects }: HomePageProps) {
    const inViewOptions = {
        amount: 0.3,
    };

    const homeRef = useRef<HTMLDivElement>(null);
    const homeInView = useInView(homeRef, inViewOptions);
    const projectsRef = useRef<HTMLDivElement>(null);
    const projectsInView = useInView(projectsRef, inViewOptions);

    const routes: NavRoute[] = [
        {
            name: "Home",
            ref: homeRef,
            icon: HomeIcon,
            inView: homeInView,
        },
        {
            name: "Projects",
            ref: projectsRef,
            icon: ProjectsIcon,
            inView: projectsInView,
        },
    ];

    console.log(routes);

    return (
        <>
            <Nav routes={routes} socials={SOCIALS} />
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

const SOCIALS: SocialRoute[] = [
    {
        name: "Twitter",
        href: TWITTER_LINK,
        icon: TwitterIcon,
    },
    {
        name: "GitHub",
        href: GITHUB_LINK,
        icon: GitHubIcon,
    },
    {
        name: "LinkedIn",
        href: LINKED_IN_LINK,
        icon: LinkedInIcon,
    },
];
