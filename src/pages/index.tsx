import { GetStaticProps } from "next";
import { useRef } from "react";

import graphQL, { ProjectProps, PROJECTS } from "commons/graphql";
import Nav from "components/nav";
import Page from "components/pages";
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
    const json = await resp.json(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    const projects: ProjectProps[] = json.data.viewer.pinnedItems.nodes; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    return {
        props: {
            projects,
        },
        revalidate: 3600,
    };
};
