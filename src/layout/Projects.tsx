import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { staggerAnimation } from "@/commons/framer";
import type { ProjectData } from "@/commons/graphql/projects";

import { Heading, Paragraph } from "@/components/ui";

import Project from "@/components/projects/Project";

import Section from "@/layout/Section";

import { motion } from "framer-motion";

export type ProjectsProps = {
    projects: ProjectData[];
};

const NAME = "Projects";
const DESCRIPTION =
    "I hand-picked these six projects to showcase my skill set and creativity. I host each project on GitHub.";
const INDEX = 1;

const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => {
    console.log("Projects");
    return (
        <Section ref={ref} name={NAME} description={DESCRIPTION} index={INDEX}>
            <Heading as="h1">{NAME}</Heading>
            <Paragraph size="lg">{DESCRIPTION}</Paragraph>
            <ProjectsContainer variants={staggerAnimation} initial="initial" animate="animate">
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </ProjectsContainer>
        </Section>
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
