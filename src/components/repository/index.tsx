import type { PropsWithChildren } from "react";

import { fadeChild } from "commons/animations";
import { GITHUB } from "commons/config";
import type { RepositoryProps } from "commons/graphql";
import theme from "commons/theme";
import { Header, ParseHTML, To } from "components/common";
import { Forks, Stars } from "components/repository/details";
import Language from "components/repository/language";

import { motion } from "framer-motion";
import styled from "styled-components";

type ProjectProps = PropsWithChildren<RepositoryProps>;

export default function Repository({ children, ...project }: ProjectProps): JSX.Element {
    return (
        <ProjectContainer variants={fadeChild}>
            <div>
                <h3>
                    <To href={project.url}>
                        {project.owner.login !== GITHUB && (
                            <Owner>
                                <Header>{project.owner.login}/</Header>
                            </Owner>
                        )}
                        {project.name}
                    </To>
                </h3>
                <Details>
                    <ul>
                        <Stars stargazers={project.stargazers.totalCount} />
                        <Forks forks={project.forks.totalCount} />
                    </ul>
                </Details>
                <Footer>
                    <Language name={project.primaryLanguage.name} />
                    <span>{project.primaryLanguage.name}</span>
                </Footer>
                <Description>
                    <ParseHTML html={project.descriptionHTML} />
                </Description>
                {children}
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
    will-change: transform;
    word-break: break-word;

    width: 45%;

    @media only screen and (max-width: 900px) {
        width: 85%;
    }
`;

const Owner = styled.span`
    @media only screen and (max-width: 500px) {
        display: none;
    }
`;

const Description = styled.p`
    padding-bottom: 10px;

    @media only screen and (max-width: 450px) {
        font-size: 1em;
        line-height: 1.4;
    }
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 12px;
    right: 16px;

    & > ul > :last-child {
        margin: 0;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 10px;

    & > svg {
        margin-right: 6px;
    }
`;
