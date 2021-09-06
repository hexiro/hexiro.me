import React from "react";

import { HomeProps, ProjectProps } from "types";

import { Header } from "components/common";
import Lanyard from "components/lanyard";
import Page from "components/pages";
import Project from "components/projects";
import Socials from "components/socials";

import { Age, Github } from "data/config";
import GraphQL from "data/graphql";

import FadeIn from "react-fade-in";
import styled, { css } from "styled-components";

export default function Home({ projects }: HomeProps): JSX.Element {
    const description = `A ${Age()} y/o aspiring Software Engineer`;
    return (
        <Page name="Home" description={description}>
            <Main>
                <Side side="left">
                    <Intro delay={50} transitionDuration={400}>
                        <h1>
                            Hi! I'm <Header>Hexiro</Header>,
                        </h1>
                        <h2>{description}</h2>
                        <Socials delay={120} transitionDuration={450} />
                        <Lanyard />
                    </Intro>
                </Side>
                <Side side="right">
                    <Projects delay={80} transitionDuration={425}>
                        {projects.map(project => (
                            <Project {...project} />
                        ))}
                    </Projects>
                </Side>
            </Main>
        </Page>
    );
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
const Intro = styled(FadeIn)`
    line-height: 3em;
    margin-left: 30px;
    min-height: 115px;
    position: relative;
    transform: translateY(-20%);

    @media only screen and (max-width: 1250px) {
        margin-left: unset;
    }
`;

const Projects = styled(FadeIn)`
    @media only screen and (max-width: 1250px) {
        display: block;
    }
`;

// regen top 3 pinned repos every hour
export const getStaticProps = async () => {
    const resposQuery = await GraphQL(`
{
  user(login: "${Github}") {
    pinnedItems(first: 3, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          descriptionHTML
          url
          owner {
            login
          }
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
          primaryLanguage {
            name
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
}
`);
    const json = await resposQuery.json();
    const projects: ProjectProps[] = json["data"]["user"]["pinnedItems"]["nodes"];

    return {
        props: {
            projects,
        },
        revalidate: 3600,
    };
};
