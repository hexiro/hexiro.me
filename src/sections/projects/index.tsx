import { forwardRef } from "react";

import type { RepositoryProps } from "commons/graphql";
import { Header } from "components/common";
import Repository from "components/repository";

import styled from "styled-components";

interface ProjectsProps {
    projects: RepositoryProps[];
}

export const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => (
    <ProjectsSection ref={ref} id="projects">
        <Text>
            <h1>
                <Header>Projects</Header>
            </h1>
            <p>
                Each project is hand-picked to best showcase my skills and creativity and can be
                found on Github under my top six pinned repositories.
            </p>
        </Text>
        <ProjectsContainer>
            {projects.map(project => (
                <Repository key={project.name} {...project} />
            ))}
        </ProjectsContainer>
    </ProjectsSection>
));

const Text = styled.div`
    text-align: left;
    margin: 12.5px;

    & p {
        max-width: 700px;
    }
`;
const ProjectsContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const ProjectsSection = styled.section`
    position: relative;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-left: 50px;

    @media only screen and (max-width: 600px) {
        justify-content: center;
        margin-left: unset;

        ${Text} {
            text-align: center;
        }
        ${ProjectsContainer} {
            justify-content: center;
        }
    }
`;
