import React from "react";

import { Lanyard, Project, SocialMedia } from "components";
import Page from "components/pages";
import { Age, Github, GithubLink, SteamLink, TwitterLink } from "data/config";
import GraphQL from "data/graphql";
import FadeIn from "react-fade-in";
import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";
import { HomeProps, ProjectProps } from "types";

export default function Home({ projects }: HomeProps) {
    const description = `A ${Age()} y/o aspiring Software Engineer`;
    return (
        <Page name="Home" description={description}>
            <main>
                <div className="left">
                    <FadeIn className="intro">
                        <h1>
                            Hi! I'm <span className="main-accent font-weight-400">Hexiro</span>,
                        </h1>
                        <h2>{description}</h2>
                        <ul className="socials">
                            <SocialMedia href={TwitterLink}>
                                <RiTwitterLine />
                            </SocialMedia>
                            <SocialMedia href={GithubLink}>
                                <RiGithubLine />
                            </SocialMedia>
                            <SocialMedia href={SteamLink}>
                                <RiSteamLine />
                            </SocialMedia>
                        </ul>
                        <Lanyard />
                    </FadeIn>
                </div>
                <div className="right">
                    <FadeIn className="projects" delay={100}>
                        {projects.map((project) => (
                            <Project {...project} />
                        ))}
                    </FadeIn>
                </div>
            </main>
        </Page>
    );
}

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
