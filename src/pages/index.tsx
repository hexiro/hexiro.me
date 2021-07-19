import { Age, Github, GithubLink, SteamLink, TwitterLink } from "../data/config";
import Project, { ProjectProps } from "../components/Project";
import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";

import GraphQL from "../data/graphql";
import Lanyard from "../components/Lanyard";
import Link from "next/link";
import Page from "../components/Page";
import React from "react";
import { motion } from "framer-motion";

interface HomeProps {
    projects: ProjectProps[];
    age: number;
}

export const getStaticProps = async () => {
    const pinnedRepos = `
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
`;
    const res = await GraphQL(pinnedRepos);
    const json = await res.json();
    const projects: ProjectProps[] = json["data"]["user"]["pinnedItems"]["nodes"];

    return {
        props: {
            projects,
            age: Age(),
        },
        revalidate: 3600,
    };
};

export default function Home({ projects, age }: HomeProps) {
    const description = `A ${age} y/o aspiring Software Engineer`;
    return (
        <Page name="Home" description={description}>
            <main>
                <div className="left">
                    <div className="intro">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Hi! I'm <span className="main-accent font-weight-400">Hexiro</span>,
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {description}
                        </motion.h2>
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            className="socials"
                        >
                            <li className="social-item">
                                <Link href={TwitterLink}>
                                    <a rel="noreferrer" target="_blank">
                                        <RiTwitterLine />
                                    </a>
                                </Link>
                            </li>
                            <li className="social-item">
                                <Link href={GithubLink}>
                                    <a rel="noreferrer" target="_blank">
                                        <RiGithubLine />
                                    </a>
                                </Link>
                            </li>
                            <li className="social-item">
                                <Link href={SteamLink}>
                                    <a rel="noreferrer" target="_blank">
                                        <RiSteamLine />
                                    </a>
                                </Link>
                            </li>
                        </motion.ul>
                    </div>
                </div>
                <div className="right">
                    <motion.div
                        className="projects"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {projects.map((project) => (
                            <Project
                                name={project.name}
                                descriptionHTML={project.descriptionHTML}
                                url={project.url}
                                owner={project.owner}
                                stargazers={project.stargazers}
                                forks={project.forks}
                                pullRequests={project.pullRequests}
                                issues={project.issues}
                                primaryLanguage={project.primaryLanguage}
                                defaultBranchRef={project.defaultBranchRef}
                            />
                        ))}
                    </motion.div>
                </div>
            </main>
            <footer>
                <Lanyard />
            </footer>
        </Page>
    );
}
