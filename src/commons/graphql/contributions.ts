import githubGraphQL from "@/commons/graphql";
import gql from "@/commons/graphql/gql";
import type { Project, RepositoryData } from "@/commons/graphql/projects";
import { parseProject } from "@/commons/graphql/projects";

export interface ProjectWithContribution extends Project {
    additions: number;
    deletions: number;
}

type JsonType = { data: { viewer: { pullRequests: PullRequestsData } } };

export default async function contributions(): Promise<ProjectWithContribution[]> {
    let resp: Response;
    let json: JsonType;

    resp = await githubGraphQL(CONTRIBUTIONS_FIRST_PAGE);
    json = (await resp.json()) as JsonType;

    let rawProjectsWithContribution = json.data.viewer.pullRequests.nodes;

    while (json.data.viewer.pullRequests.pageInfo.hasNextPage) {
        const { pullRequests } = json.data.viewer;

        resp = await githubGraphQL(contributionsFromCursor(pullRequests.pageInfo.endCursor));
        json = (await resp.json()) as JsonType;

        rawProjectsWithContribution.push(...json.data.viewer.pullRequests.nodes);
    }

    const nameWithOwner = ({ baseRepository }: ContributionsAndRepositoryData) =>
        `${baseRepository.owner.login}/${baseRepository.name}`;

    // remove repos the user has access to, is in the organization of, or owns
    rawProjectsWithContribution = rawProjectsWithContribution.filter((x) =>
        x.authorAssociation.includes("CONTRIBUTOR")
    );

    const matchedProjects: Record<string, ContributionsAndRepositoryData[]> = {};

    // merge contributions

    for (const rawProjectWithContribution of rawProjectsWithContribution) {
        const name = nameWithOwner(rawProjectWithContribution);
        if (matchedProjects[name]) {
            matchedProjects[name].push(rawProjectWithContribution);
        } else {
            matchedProjects[name] = [rawProjectWithContribution];
        }
    }

    let projectsWithContribution: ProjectWithContribution[] = Object.values(matchedProjects).map(
        (matches) => {
            const { baseRepository } = matches[0];
            const additions = matches.reduce((acc, x) => acc + x.additions, 0);
            const deletions = matches.reduce((acc, x) => acc + x.deletions, 0);
            return {
                ...parseProject(baseRepository),
                additions,
                deletions,
            };
        }
    );

    // sort
    projectsWithContribution = projectsWithContribution.sort((a, b) =>
        a.additions + a.deletions > b.additions + b.deletions ? -1 : 1
    );

    // slice
    projectsWithContribution = projectsWithContribution.slice(0, 6);

    return projectsWithContribution;
}

interface PullRequestsData {
    pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
    };
    nodes: ContributionsAndRepositoryData[];
}

interface ContributionsAndRepositoryData {
    additions: number;
    deletions: number;
    authorAssociation:
        | "MEMBER"
        | "OWNER"
        | "MANNEQUIN"
        | "COLLABORATOR"
        | "CONTRIBUTOR"
        | "FIRST_TIME_CONTRIBUTOR"
        | "FIRST_TIMER"
        | "NONE";
    baseRepository: RepositoryData;
}

const CONTRIBUTIONS_FIRST_PAGE = gql`
    {
        viewer {
            pullRequests(
                first: 50
                states: MERGED
                orderBy: { field: CREATED_AT, direction: DESC }
            ) {
                totalCount
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    ... on PullRequest {
                        additions
                        deletions
                        authorAssociation
                        baseRepository {
                            name
                            descriptionHTML
                            url
                            isPrivate
                            owner {
                                login
                            }
                            stargazers {
                                totalCount
                            }
                            forks {
                                totalCount
                            }
                            languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
                                edges {
                                    ... on LanguageEdge {
                                        size
                                        node {
                                            name
                                        }
                                    }
                                }
                                totalSize
                            }
                        }
                    }
                }
            }
        }
    }
`;

const contributionsFromCursor = (cursor: string) => gql`
    {
        viewer {
            pullRequests(
                first: 50
                states: MERGED
                orderBy: { field: CREATED_AT, direction: DESC },
                after: "${cursor}"
            ) {
                totalCount
                pageInfo {
                    hasNextPage
                    endCursor
                }
                nodes {
                    ... on PullRequest {
                        additions
                        deletions
                        authorAssociation
                        baseRepository {
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
                            languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
                                edges {
                                    ... on LanguageEdge {
                                        size
                                        node {
                                            name
                                        }
                                    }
                                }
                                totalSize
                            }
                        }
                    }
                }
            }
        }
    }
`;
