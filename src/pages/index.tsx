import React from "react";

import { HomeProps, ProjectProps } from "types";

import { FadeIn, Lanyard, Project, Socials } from "components";
import Page from "components/pages";
import { Age, Github } from "data/config";
import GraphQL from "data/graphql";
import theme from "data/theme";

import styled, { css } from "styled-components";

export default function Home({ projects }: HomeProps): JSX.Element {
    const description = `A ${Age()} y/o aspiring Software Engineer`;
    return (
        <Page name="Home" description={description} locked={true}>
            <Main>
                <Side side="left">
                    <Intro>
                        <h1>
                            Hi! I'm <Name>Hexiro</Name>,
                        </h1>
                        <h2>{description}</h2>
                        <Socials />
                        <Lanyard />
                    </Intro>
                </Side>
                <Side side="right">
                    <div className="projects">
                        {projects.map(project => (
                            <Project {...project} />
                        ))}
                    </div>
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
`;

// transform makes it so the vertical centering is centered around the description line
// instead of around the whole div
const Intro = styled.div`
    line-height: 3em;
    margin-left: 30px;
    min-height: 115px;
    position: relative;
    transform: translateY(-20%);

    & ul {
        margin-top: 10px;
    }
`;

const Name = styled.span`
    color: ${theme.accent.main};
    font-weight: 400;
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
