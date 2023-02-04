import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { staggerAnimation } from "@/commons/animations";
import type { ProjectData } from "@/commons/graphql/projects";

import { Heading, Paragraph } from "@/components/ui";

import Project from "@/components/projects/Project";

import type { SectionSelectedProps } from "@/layout/Section";
import Section from "@/layout/Section";

import { motion } from "framer-motion";

type ProjectsProps = {
    projects: ProjectData[];
} & SectionSelectedProps;

const DESCRIPTION =
    "I hand-picked these six projects to showcase my skill set and creativity. I host each project on GitHub.";

const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects, isSelected }, ref) => {
    console.log("Projects");
    return (
        <Section ref={ref} name="Projects" description={DESCRIPTION} isSelected={isSelected}>
            <Heading as="h1">Projects</Heading>
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
