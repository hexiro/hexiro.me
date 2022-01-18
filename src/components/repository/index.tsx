import type { PropsWithChildren } from "react";

import { fadeChild } from "commons/animations";
import { GITHUB } from "commons/config";
import type { RepositoryProps } from "commons/graphql";
import theme from "commons/theme";
import { Header, ParseHTML, To } from "components/common";
import { Forks, Stars } from "components/repository/details";

import { motion } from "framer-motion";
import styled from "styled-components";

type ProjectProps = PropsWithChildren<RepositoryProps>;

export default function Repository({ children, ...project }: ProjectProps): JSX.Element {
    return (
        <ProjectContainer variants={fadeChild}>
            <div>
                <Title>
                    <h3>
                        <To newTab href={project.url}>
                            {project.owner.login !== GITHUB && (
                                <Header>{project.owner.login}/</Header>
                            )}
                            {project.name}
                        </To>
                    </h3>
                </Title>
                <Description>
                    <ParseHTML html={project.descriptionHTML} />
                </Description>
                {children}
                <Footer>
                    <Language>{project.primaryLanguage.name}</Language>
                    <ul>
                        <Stars stargazers={project.stargazers.totalCount} />
                        <Forks forks={project.forks.totalCount} />
                    </ul>
                </Footer>
            </div>
        </ProjectContainer>
    );
}

const ProjectContainer = styled(motion.div)`
    position: relative;
    padding: 15px 20px 4px 20px;
    margin: 12.5px;
    min-width: 310px;
    max-width: 630px;
    height: 200px;
    border-radius: 10px;
    background: ${theme.accent.background};
    box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25);
    /* transition: ease-out all 0.31s; */
    will-change: transform;

    width: 45%;

    @media only screen and (max-width: 894px) {
        width: 75%;
    }
`;

const Title = styled.div`
    word-break: break-word;
    color: ${theme.core.main};
`;

const Description = styled.p`
    padding-bottom: 10px;
`;

const Language = styled.p`
    margin-right: 20px;
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 6px;
`;
