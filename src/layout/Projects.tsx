import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { staggerAnimation } from "@/commons/animations";
import type { ProjectData } from "@/commons/graphql/projects";

import { Heading, Paragraph } from "@/components/ui";

import Project from "@/components/projects/Project";

import { motion } from "framer-motion";
import Page from "layout/Page";

interface ProjectsProps {
    projects: ProjectData[];
}

const DESCRIPTION = "Projects";

const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => {
    console.log("Projects");
    return (
        <Page ref={ref} name="Projects" description={DESCRIPTION}>
            <Heading as="h1">Projects</Heading>
            <Paragraph size="lg">
                I hand-picked these six projects to showcase my skill set and creativity. I host
                each project on GitHub.
            </Paragraph>
            <ProjectsContainer variants={staggerAnimation} initial="initial" animate="animate">
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </ProjectsContainer>
        </Page>
    );
});

export default memo(Projects);

const ProjectsContainer = styled(motion.div, {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "2%",
    rowGap: "$4",
    marginTop: "$6",

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
