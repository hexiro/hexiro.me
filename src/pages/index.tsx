import type { GetStaticProps } from "next";
import { useRef } from "react";

import type { RepositoryProps, PullRequestProps } from "commons/graphql";
import contributions from "commons/graphql/contributions";
import projects from "commons/graphql/projects";
import { Page } from "components/pages";
import Sections, { Contributions, Me, Projects } from "sections";
import Nav from "sections/nav";

interface HomeProps {
    projects: RepositoryProps[];
    contributions: PullRequestProps[];
}

export default function Home({ projects, contributions }: HomeProps) {
    const meRef = useRef<HTMLElement | null>(null);
    const projectsRef = useRef<HTMLElement | null>(null);
    const contributionsRef = useRef<HTMLElement | null>(null);

    return (
        <Page name="Home" description="desc">
            <Nav meRef={meRef} projectsRef={projectsRef} contributionsRef={contributionsRef} />
            <Sections>
                <Me ref={meRef} />
                <Projects ref={projectsRef} projects={projects} />
                <Contributions ref={contributionsRef} contributions={contributions} />
            </Sections>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    return {
        props: {
            projects: await projects(),
            contributions: await contributions(),
        },
        revalidate: 3600,
    };
};
