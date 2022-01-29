import { forwardRef, useEffect, useState } from "react";

import { fade, fadeChildren } from "commons/animations";
import type { RepositoryProps } from "commons/graphql";
import { Header } from "components/common";
import Repository from "components/repository";
import type { SectionProps } from "sections";

import { motion, useAnimation } from "framer-motion";
import { useScrollAnimation } from "hooks/useScrollAnimation";
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
                <p>
                    Each project is hand-picked to best showcase my skills and creativity and can be
                    found on Github under my top six pinned repositories.
                </p>
            </Text>
            <ProjectsContainer variants={fadeChildren}>
                {repositories.map(repo => (
                    <Repository
                        key={repo.name}
                        details={repo}
                        // i'm not sure exactly why but i can't get this to work with variants
                        whileHover={{ translateY: -3 }}
                        variants={fade}
                    />
                ))}
            </ProjectsContainer>
        </ProjectsSection>
    );
});

const Text = styled(motion.div)`
    text-align: left;
    margin: 12.5px;

    & p {
        max-width: 700px;
    }
`;
const ProjectsContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    align-content: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const ProjectsSection = styled(motion.section)`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    padding-left: 4%;

    @media only screen and (max-width: 600px) {
        justify-content: center;
        padding-left: unset;

        ${Text} {
            text-align: center;
        }
        ${ProjectsContainer} {
            justify-content: center;
        }
    }
`;
