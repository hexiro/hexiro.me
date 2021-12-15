import { GetStaticProps } from "next";
import React, { useRef } from "react";

import Nav from "components/nav";
import Page from "components/pages";

import graphQL, { ProjectProps, PROJECTS } from "commons/graphql";

import Sections, { Me, Projects } from "sections";

interface HomeProps {
    projects: ProjectProps[];
}

export default function Home({ projects }: HomeProps) {
    const meRef = useRef<HTMLElement | null>(null);
    const projectsRef = useRef<HTMLElement | null>(null);

    return (
        <Page name="Home" description="desc">
            <Nav meRef={meRef} projectsRef={projectsRef} />
            <Sections>
                <Me ref={meRef} />
                <Projects ref={projectsRef} projects={projects} />
            </Sections>
        </Page>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const resp = await graphQL(PROJECTS);
    const json = await resp.json();
    const projects: ProjectProps[] = json.data.viewer.pinnedItems.nodes;

    return {
        props: {
            projects,
        },
        revalidate: 3600,
    };
};
