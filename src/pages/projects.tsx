import { styled } from "@/theme";

import type { GetStaticProps } from "next";

import { staggerAnimation } from "@/commons/animations";
import type { ProjectData } from "@/commons/graphql/projects";
import projects from "@/commons/graphql/projects";
import Project from "@/components/project";
import { Heading, Subtext } from "@/components/ui";
import Page from "@/layout/Page";

import { motion } from "framer-motion";

const DESCRIPTION = "Projects";

interface ProjectsPageProps {
    projects: ProjectData[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    return (
        <Page name="Projects" description={DESCRIPTION}>
            <Heading as="h1">Projects</Heading>
            <Subtext>
                I hand-picked these six projects to showcase my skill set and creativity. I host
                each project on GitHub.
            </Subtext>
            <ProjectsContainer variants={staggerAnimation} initial="initial" animate="animate">
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </ProjectsContainer>
        </Page>
    );
}

const ProjectsContainer = styled(motion.div, {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "2%",
    rowGap: "$4",
    marginTop: "6em",

    // one-column layout
    "@lg": {
        paddingRight: "20%",
    },

    // two-column layout
    "@xl": {
        paddingRight: "10%",
    },

    // two-column layout
    "@xxl": {
        paddingRight: "20%",
    },
});

export const getStaticProps: GetStaticProps = async () => ({
    props: {
        projects: await projects(),
    },
});
