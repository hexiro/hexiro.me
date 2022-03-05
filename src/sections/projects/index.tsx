import { forwardRef } from "react";

import { fade, fadeChildren } from "commons/animations";
import type { RepositoryProps } from "commons/graphql";
import { Header } from "components/common";
import Repository from "components/repository";
import { useScrollAnimation } from "hooks/useScrollAnimation";
import type { SectionProps } from "sections";

import { motion } from "framer-motion";
import styled from "styled-components";

interface ProjectsProps extends SectionProps {
    repositories: RepositoryProps[];
}

export const Projects = forwardRef<HTMLElement, ProjectsProps>(({ repositories, inView }, ref) => {
    const animate = useScrollAnimation(inView);
    return (
        <ProjectsSection
            ref={ref}
            id="projects"
            animate={animate}
            initial="start"
            variants={fadeChildren}
        >
            <Text variants={fade}>
                <h1>
                    <Header>Projects</Header>
                </h1>
                <Description>
                    These projects are my top 6 pinned repositories on GitHub. I specifically
                    hand-picked each repository as they nicely display my skill set and creativity.
                </Description>
            </Text>
            <ProjectsContainer variants={fadeChildren}>
                {repositories.map(repo => (
                    <Repository key={repo.name} details={repo} />
                ))}
            </ProjectsContainer>
        </ProjectsSection>
    );
});

const Text = styled(motion.div)`
    text-align: left;
    margin-left: 1%;
`;

const Description = styled.p`
    max-width: 700px;
`;

const ProjectsContainer = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
`;

const ProjectsSection = styled(motion.section)`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 900px) {
        justify-content: center;

        ${Text} {
            text-align: center;
        }
        ${Description} {
            max-width: unset;
            margin: 0 5%;
        }
        ${ProjectsContainer} {
            justify-content: center;
        }
    }
`;
