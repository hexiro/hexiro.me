import { Age, Github, GithubLink, GithubToken, Twitter, TwitterLink } from "../data/config";
import { FiGithub, FiTwitter } from "react-icons/fi";
import Project, { ProjectProps } from "../components/Project";

import Link from "next/link";
import Page from "../components/Page";

interface HomeProps {
    projects: ProjectProps[];
    age: number;
    github: string;
    githubLink: string;
    twitterLink: string;
}

export const getStaticProps = async () => {
    const data = {
        query: `
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
`,
    };
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `token ${GithubToken}`,
        },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    const projects: ProjectProps[] = json["data"]["user"]["pinnedItems"]["nodes"];

    return {
        props: {
            projects,
            age: Age(),
            github: Github,
            githubLink: GithubLink,
            twitter: Twitter,
            twitterLink: TwitterLink,
        },
        revalidate: 3600,
    };
};

export default function Home({ projects, age, github, githubLink, twitterLink }: HomeProps) {
    const description = `A ${age} y/o aspiring Software Engineer`;
    return (
        <Page name="Home" description={description}>
            <main>
                <div className="left">
                    <div className="intro">
                        <h1>
                            Hi! I'm <span className="main-accent font-weight-400">Hexiro</span>,
                        </h1>
                        <h2>{description}</h2>
                    </div>
                </div>
                <div className="right">
                    <div className="projects">
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
                    </div>
                </div>
            </main>
            <footer>
                <ul>
                    <li className="social-item">
                        <Link href={twitterLink}>
                            <a rel="noreferrer" target="_blank">
                                <FiTwitter />
                            </a>
                        </Link>
                    </li>
                    <li className="social-item">
                        <Link href={githubLink}>
                            <a rel="noreferrer" target="_blank">
                                <FiGithub />
                            </a>
                        </Link>
                    </li>
                </ul>
            </footer>
        </Page>
    );
}
