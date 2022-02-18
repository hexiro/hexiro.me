import type { PropsWithChildren } from "react";

import { GITHUB } from "commons/config";
import type { RepositoryProps } from "commons/graphql";
import theme from "commons/theme";
import { ParseHTML, To } from "components/common";
import { Forks, Stars } from "components/repository/details";
import Language from "components/repository/language";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";

type ProjectProps = HTMLMotionProps<"div"> &
    PropsWithChildren<{
        details: RepositoryProps;
    }>;

export default function Repository({ children, details, ...all }: ProjectProps): JSX.Element {
    return (
        <ProjectContainer {...all}>
            <div>
                <ProjectNav>
                    <ProjectName>
                        <To href={details.url}>
                            {details.owner.login !== GITHUB && (
                                <Owner>{details.owner.login}/</Owner>
                            )}
                            <span>{details.name}</span>
                        </To>
                    </ProjectName>
                    <Details>
                        <ul>
                            <Stars stargazers={details.stargazers.totalCount} />
                            <Forks forks={details.forks.totalCount} />
                        </ul>
                    </Details>
                </ProjectNav>
                <Footer>
                    <Language name={details.primaryLanguage.name} />
                    <LanguageName>{details.primaryLanguage.name}</LanguageName>
                    {children}
                </Footer>
                <Description>
                    <ParseHTML html={details.descriptionHTML} />
                </Description>
            </div>
        </ProjectContainer>
    );
}

const ProjectContainer = styled(motion.div)`
    position: relative;
    padding: 12px 20px 4px 20px;
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
    font-size: 1em;

    @media only screen and (max-width: 450px) {
        line-height: 1.4;
    }
`;

const ProjectNav = styled.div`
    display: flex;
    align-items: center;
`;

const ProjectName = styled.h3`
    display: inline-block;
    /* flex-grow: 1; */
    /* width: 100%; */
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    
    margin-left: auto;
    padding-left: 4%;
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

const LanguageName = styled.span`
    margin-right: 10px;
`;
