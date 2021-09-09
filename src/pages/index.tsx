import { GetStaticProps } from "next";
import React from "react";

import { Header } from "components/common";
import Lanyard from "components/lanyard";
import Page from "components/pages";
import Project from "components/projects";
import Socials from "components/socials";

import { Age } from "data/config";
import GraphQL, { ProjectProps, REPOS_QUERY } from "data/graphql";
import { fadeChild, fadeParent } from "data/variants";

import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export default function Home({ projects }: HomeProps): JSX.Element {
    const description = `A ${Age()} y/o aspiring Software Engineer`;
    return (
        <Page name="Home" description={description}>
            <Main>
                <Side side="left">
                    <Intro initial="start" animate="fade" variants={fadeParent}>
                        <motion.h1 variants={fadeChild}>
                            Hi! I'm <Header>Hexiro</Header>,
                        </motion.h1>
                        <motion.h2 variants={fadeChild}>{description}</motion.h2>
                        <Socials />
                        <Lanyard />
                    </Intro>
                </Side>
                <Side side="right">
                    <Projects>
                        {projects.map(project => (
                            <Project {...project} />
                        ))}
                    </Projects>
                </Side>
            </Main>
        </Page>
    );
}

interface HomeProps {
    projects: ProjectProps[];
}

const Main = styled.main`
    display: flex;
    align-content: center;
    min-height: 100vh;
    height: 100%;

    @media only screen and (max-width: 1250px) {
        padding-top: 125px;
        display: block;
        min-height: 84vh;
    }
`;

// prettier-ignore
const Side = styled.div<{ side: "left" | "right" }>`
    display: flex;
    flex: 1;
    align-items: center;
    ${({ side }) => side === "right" && css`
            justify-content: center;
            margin: 20px 0;
      `}

    @media only screen and (max-width: 1250px) {
        display: block;
        text-align: center;
        margin: 0;
    }
`;

// transform makes it so the vertical centering is centered around the description line
// instead of around the whole div
const Intro = styled(motion.div)`
    line-height: 3em;
    margin-left: 30px;
    min-height: 115px;
    position: relative;
    transform: translateY(-20%);

    @media only screen and (max-width: 1250px) {
        margin-left: unset;
    }
`;

const Projects = styled.div`
    @media only screen and (max-width: 1250px) {
        display: block;
    }
`;

// regen top 3 pinned repos every hour
export const getStaticProps: GetStaticProps = async () => {
    const resp = await GraphQL(REPOS_QUERY);
    const json = await resp.json();
    const projects: ProjectProps[] = json["data"]["user"]["pinnedItems"]["nodes"];

    return {
        props: {
            projects,
        },
        revalidate: 3600,
    };
};
