import { forwardRef, memo } from "react";

import BrandedBoxContainer from "@/components/BrandedBoxContainer";
import Project from "@/components/projects/Project";

import type { ProjectData } from "@/data/projects";

import Section from "@/layout/Section";

export type ProjectsProps = {
    projects: ProjectData[];
};

const NAME = "Projects";
const DESCRIPTION =
    "I hand-picked these six projects to showcase my skill set and creativity. I host each project on GitHub.";

const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => (
    <Section ref={ref} name={NAME} description={DESCRIPTION}>
        <BrandedBoxContainer>
            {projects.map((project) => (
                <Project key={project.name} data={project} />
            ))}
        </BrandedBoxContainer>
    </Section>
));

export default memo(Projects);
