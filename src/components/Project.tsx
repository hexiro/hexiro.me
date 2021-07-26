import { BiGitCommit, BiGitPullRequest, BiGitRepoForked, BiStar } from "react-icons/bi";

import { Github } from "../data/config";
import { ProjectProps } from "../types";
import { ParseHTML } from "./";

export const Project = (project: ProjectProps): JSX.Element => {
    return (
        <div className="projects-item transition">
            <div className="projects-container">
                <div className="project-title main-color">
                    <h3>
                        <a href={project.url} rel="noreferrer" target="_blank">
                            {project.owner.login == Github ? (
                                project.name
                            ) : (
                                <>
                                    <span className="main-accent">{project.owner.login}/</span>
                                    {project.name}
                                </>
                            )}
                        </a>
                    </h3>
                </div>
                <p>
                    {
                        // remove redundant <div></div> with .slice(5, -6)
                        <ParseHTML html={project.descriptionHTML.slice(5, -6)} />
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
        </div>
    );
};
