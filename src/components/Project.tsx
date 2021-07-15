import { BiGitCommit, BiGitPullRequest, BiGitRepoForked, BiStar } from "react-icons/bi";

import { Github } from "../data/config";
import { motion } from "framer-motion";
import parse from "html-react-parser";

export interface ProjectProps {
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

export default function Project(project: ProjectProps): JSX.Element {
    return (
        <motion.div
            className="projects-item transition"
            transition={{ duration: 0.06, type: "spring" }}
            whileHover={{ translateX: "-2.5%", translateY: "-2.5%" }}
        >
            <div className="projects-container">
                <div className="project-title main-color">
                    <a href={project.url} rel="noreferrer" target="_blank">
                        {project.owner.login == Github ? (
                            <h3>{project.name}</h3>
                        ) : (
                            <h3>
                                <span className="main-accent">{project.owner.login}/</span>
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
                    <span className="project-language">{project.primaryLanguage.name}</span>
                    <ul>
                        {project.stargazers.totalCount > 0 && (
                            <li className="project-detail">
                                <BiStar />
                                <h4>{project.stargazers.totalCount}</h4>
                            </li>
                        )}
                        {project.forks.totalCount > 0 && (
                            <li className="project-detail">
                                <BiGitRepoForked />
                                <h4>{project.forks.totalCount}</h4>
                            </li>
                        )}
                        {project.pullRequests.totalCount > 0 && (
                            <li className="project-detail">
                                <BiGitPullRequest />
                                <h4>{project.pullRequests.totalCount}</h4>
                            </li>
                        )}
                        {
                            <li className="project-detail">
                                <BiGitCommit />
                                <h4>{project.defaultBranchRef.target.history.totalCount}</h4>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}
