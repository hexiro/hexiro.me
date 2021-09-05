import { ProjectProps } from "types";

import { ParseHTML, To } from "components";
import { Github } from "data/config";
import theme from "data/theme";

import { BiGitCommit, BiGitPullRequest, BiGitRepoForked, BiStar } from "react-icons/bi";
import styled from "styled-components";

export const Project = (project: ProjectProps): JSX.Element => {
    return (
        <ProjectItem>
            <ProjectContent>
                <Title>
                    <h3>
                        <To href={project.url}>
                            {project.owner.login == Github ? (
                                project.name
                            ) : (
                                <>
                                    <span className="main-accent">{project.owner.login}/</span>
                                    {project.name}
                                </>
                            )}
                        </To>
                    </h3>
                </Title>
                <p>
                    <ParseHTML html={project.descriptionHTML.slice(5, -6)} />
                </p>
                <Footer>
                    <Language>{project.primaryLanguage.name}</Language>
                    <ul>
                        {project.stargazers.totalCount > 0 && (
                            <ProjectDetail>
                                <BiStar />
                                <h4>{project.stargazers.totalCount}</h4>
                            </ProjectDetail>
                        )}
                        {project.forks.totalCount > 0 && (
                            <ProjectDetail>
                                <BiGitRepoForked />
                                <h4>{project.forks.totalCount}</h4>
                            </ProjectDetail>
                        )}
                        {project.pullRequests.totalCount > 0 && (
                            <ProjectDetail>
                                <BiGitPullRequest />
                                <h4>{project.pullRequests.totalCount}</h4>
                            </ProjectDetail>
                        )}
                        {
                            <ProjectDetail>
                                <BiGitCommit />
                                <h4>{project.defaultBranchRef.target.history.totalCount}</h4>
                            </ProjectDetail>
                        }
                    </ul>
                </Footer>
            </ProjectContent>
        </ProjectItem>
    );
};

const ProjectItem = styled.div`
    position: relative;
    min-width: 530px;
    max-width: 630px;
    height: 220px;
    border-radius: 10px;
    background: ${theme.accent.background};
    padding: 4px 20px;
    margin: 25px 0;
    box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25);
    transition: ease-out all 0.31s;
    will-change: transform;

    &:hover {
        transform: scale(1.04);
    }
`;

const Title = styled.div`
    padding-top: 10px;
    word-break: break-word;
    color: ${theme.core.main};

    & h3 a {
        opacity: 1;
    }
`;

const ProjectContent = styled.div`
    & p {
        padding-bottom: 10px;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 6px;

    & h4 {
        margin-left: 2px;
        line-height: 33px;
    }

    & svg {
        height: 18px;
        width: 18px;
    }
`;

const Language = styled.span`
    margin-right: 20px;
`;

const ProjectDetail = styled.li`
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
`;
