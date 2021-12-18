import React from "react";

import Project from "components/projects";

import { ProjectProps } from "commons/graphql";

import styled from "styled-components";
import { Header } from "components/common";

interface ProjectsProps {
    projects: ProjectProps[];
}

export const Projects = React.forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => (
    <ProjectsSection ref={ref} id="projects">
        <Text>
            <h1><Header>Projects</Header></h1>
            <TextFooter>Each project is hand-picked to best showcase my skills and creativity and is can be found on Github under my top six pinned repositories.</TextFooter>
        </Text>
        <ProjectsContainer>
            {projects.map(project => (
                <Project key={project.name} {...project} />
            ))}
        </ProjectsContainer>
    </ProjectsSection>
));

const Text = styled.div`
    text-align: center;
`;

const TextFooter = styled.p`
    text-align: center;
    padding: 0 20%;
`

const ProjectsContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: flex-start;
    justify-content: center;
    flex-wrap: wrap;
`;

const ProjectsSection = styled.section`
    position: relative;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
`;
