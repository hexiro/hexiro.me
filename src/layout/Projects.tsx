import { forwardRef, memo } from "react";

import type { ProjectData } from "@/commons/graphql/projects";

import BrandedBoxContainer from "@/components/BrandedBoxContainer";
import Project from "@/components/projects/Project";

import Section from "@/layout/Section";

export type ProjectsProps = {
    projects: ProjectData[];
};

const NAME = "Projects";
const DESCRIPTION =
    "I hand-picked these six projects to showcase my skill set and creativity. I host each project on GitHub.";

const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => {
    console.log("Projects");
    return (
        <Section ref={ref} name={NAME} description={DESCRIPTION}>
            <BrandedBoxContainer>
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </BrandedBoxContainer>
        </Section>
    );
});

export default memo(Projects);
