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
                <p>
                    <ParseHTML html={project.descriptionHTML.slice(5, -6)} />
                </p>
                <Footer>
                    <p>{project.primaryLanguage.name}</p>
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
    min-width: 530px;
    max-width: 630px;
    height: 220px;
    border-radius: 10px;
    background: ${theme.accent.background};
    padding: 14px 20px 4px 20px;
    margin: 25px 0;
    box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25);
    transition: ease-out all 0.31s;
    will-change: transform;

    &:hover {
        transform: scale(1.04) !important;
    }

    @media only screen and (max-width: 1250px) {
        display: block;
        margin: 12.5px auto;
        width: 90%;
        min-width: unset;
        max-width: 540px;
        height: auto;
        cursor: initial;
    }
`;

const Title = styled.div`
    word-break: break-word;
    color: ${theme.core.main};

    & h3 a {
        opacity: 1;
    }

    @media only screen and (max-width: 1250px) {
        display: block;
        transform: unset;
    }
`;

const ProjectContent = styled.div`
    & > p {
        padding-bottom: 10px;
    }

    @media only screen and (max-width: 1250px) {
        & p {
            margin-bottom: 20px;
            cursor: text;
            user-select: initial;
        }
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 6px;

    & h4 {
        margin-left: 2px;
        line-height: 33px;
    }

    & svg {
        height: 18px;
        width: 18px;
    }

    & p {
        margin-right: 20px;
    }

    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;
