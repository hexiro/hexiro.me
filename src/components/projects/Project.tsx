import { Header, ParseHTML, To } from "components/common";
import { Forks, Stars } from "components/projects/details";

import { GITHUB } from "commons/config";
import { ProjectProps } from "commons/graphql";
import theme from "commons/theme";
import { fadeChild } from "commons/variants";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Project(project: ProjectProps): JSX.Element {
    return (
        <ProjectContainer variants={fadeChild}>
            <ProjectContent>
                <Title>
                    <h3>
                        <To href={project.url}>
                            {project.owner.login != GITHUB && (
                                <Header>{project.owner.login}/</Header>
                            )}
                            {project.name}
                        </To>
                    </h3>
                </Title>
                <Description>
                    <ParseHTML html={project.descriptionHTML.slice(5, -6)} />
                </Description>
                <Footer>
                    <Language>{project.primaryLanguage.name}</Language>
                    <ul>
                        <Stars stargazers={project.stargazers.totalCount} />
                        <Forks forks={project.forks.totalCount} />
                    </ul>
                </Footer>
            </ProjectContent>
        </ProjectContainer>
    );
}

const ProjectContainer = styled(motion.div)`
    position: relative;
    padding: 15px 20px 4px 20px;
    margin: 12.5px;
    min-width: 400px;
    max-width: 630px;
    height: 200px;
    border-radius: 10px;
    background: ${theme.accent.background};
    box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25);
    transition: ease-out all 0.31s;
    will-change: transform;

    &:hover {
        transform: scale(1.04) !important;
    }

    width: 45%;

    @media only screen and (max-width: 894px) {
        width: 75%
    }
`;

const Title = styled.div`
    word-break: break-word;
    color: ${theme.core.main};
`;

const ProjectContent = styled.div``;

const Description = styled.p`
    padding-bottom: 10px;

    /* @media only screen and (max-width: 1250px) {
        margin-bottom: 20px;
        cursor: text;
        user-select: initial;
    } */
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
