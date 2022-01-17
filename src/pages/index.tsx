import type { GetStaticProps } from "next";
import { useRef } from "react";

import { CONTRIBUTIONS, Repository } from "commons/graphql";
import githubGraphQL, { PROJECTS } from "commons/graphql";
import { Page } from "components/pages";
import Sections, { Contributions, Me, Projects } from "sections";
import Nav from "sections/nav";

interface HomeProps {
    projects: Repository[];
    contributions: Repository[];
}

// TODO: use more general `Repository` name that works in both projects and contributions

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
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const projectsResp = await githubGraphQL(PROJECTS);
    const projectsJson = await projectsResp.json();
    const projects: Repository[] = projectsJson.data.viewer.pinnedItems.nodes;
    const contributionsResp = await githubGraphQL(CONTRIBUTIONS);
    const contributionsJson = await contributionsResp.json();
    const contributions: Repository[] =
        contributionsJson.data.viewer.repositoriesContributedTo.nodes;

    console.log({ projects });

    return {
        props: {
            projects,
            contributions,
        },
        revalidate: 3600,
    };
};
