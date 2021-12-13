import React from "react";

import Project from "components/projects";

import { ProjectProps } from "commons/graphql";
import styled from "styled-components";

interface ProjectsProps {
    projectsRef: React.MutableRefObject<HTMLElement | null>;
    projects: ProjectProps[];
}

export const Projects = ({ projectsRef, projects }: ProjectsProps): JSX.Element => (
    <ProjectsSection id="projects" ref={projectsRef}>
        {projects.map(project => (
            <Project key={project.name} {...project} />
        ))}
    </ProjectsSection>
);

const ProjectsSection = styled.section`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 50px;
    margin-bottom: 20px;
`;
