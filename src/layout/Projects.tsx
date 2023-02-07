import { forwardRef, memo } from "react";

import type { ProjectData } from "@/commons/graphql/projects";

import { Heading, Paragraph } from "@/components/ui";

import BrandedBoxContainer from "@/components/BrandedBoxContainer";
import Project from "@/components/projects/Project";

import Section from "@/layout/Section";

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
            <BrandedBoxContainer>
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </BrandedBoxContainer>
        </Section>
    );
});

export default memo(Projects);
