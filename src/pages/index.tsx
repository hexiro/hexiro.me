import Head from "next/head";
import Link from "next/link";
import PageHeading from "../components/Heading";
import { Age, Github, GithubLink, GithubToken, Twitter, TwitterLink } from "../data/config";
import { FiTwitter, FiGithub } from "react-icons/fi";
import { BiStar, BiGitCommit, BiGitPullRequest, BiGitRepoForked } from "react-icons/bi";
import parse from "html-react-parser";

interface Project {
    name: string;
    descriptionHTML: string;
    url: string;
    owner: {
        login: string;
    };
    stargazers: {
        totalCount: number;
    };
    forks: {
        totalCount: number;
    };
    pullRequests: {
        totalCount: number;
    };
    issues: {
        totalCount: number;
    };
    primaryLanguage: {
        name: string;
    };
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number;
            };
        };
    };
}

interface HomeProps {
    projects: Project[];
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
    const projects: Project[] = json["data"]["user"]["pinnedItems"]["nodes"];

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
        <>
            <PageHeading pageName="Home" description={description}/>
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
                        {projects.map((project: Project) => (
                            <div className="projects-item transition">
                                <div className="projects-container">
                                    <div className="project-title main-color">
                                        <a href={project.url} rel="noreferrer" target="_blank">
                                            {project.owner.login == github ? (
                                                <h3>{project.name}</h3>
                                            ) : (
                                                <h3>
                                                    <span className="main-accent">
                                                        {project.owner.login}/
                                                    </span>
                                                    {project.name}
                                                </h3>
                                            )}
                                        </a>
                                    </div>
                                    <p>
                                        {
                                            // input is parser safe and will never include a script tag
                                            // remove redundant <div></div> with .slice(5, -6)
                                            parse(project.descriptionHTML.slice(5, -6))
                                        }
                                    </p>
                                    <div className="projects-footer">
                                        <span className="project-language">
                                            {project.primaryLanguage.name}
                                        </span>
                                        {project.stargazers.totalCount > 0 && (
                                            <div className="project-detail">
                                                <BiStar />
                                                <h4>{project.stargazers.totalCount}</h4>
                                            </div>
                                        )}
                                        {project.forks.totalCount > 0 && (
                                            <div className="project-detail">
                                                <BiGitRepoForked />
                                                <h4>{project.forks.totalCount}</h4>
                                            </div>
                                        )}
                                        {project.pullRequests.totalCount > 0 && (
                                            <div className="project-detail">
                                                <BiGitPullRequest />
                                                <h4>{project.pullRequests.totalCount}</h4>
                                            </div>
                                        )}
                                        {
                                            <div className="project-detail">
                                                <BiGitCommit />
                                                <h4>
                                                    {
                                                        project.defaultBranchRef.target.history
                                                            .totalCount
                                                    }
                                                </h4>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
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
        </>
    );
}
