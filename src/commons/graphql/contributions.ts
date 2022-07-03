import { GITHUB } from "commons/config";
import githubGraphQL from "commons/graphql";
import gql from "commons/graphql/gql";
import type { Project, RepositoryData } from "commons/graphql/projects";
import { parseProject } from "commons/graphql/projects";

export interface ProjectWithContribution extends Project {
    additions: number;
    deletions: number;
}

export default async function contributions(): Promise<ProjectWithContribution[]> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const resp = await githubGraphQL(CONTRIBUTIONS);
    const json = await resp.json();

    let rawProjectsWithContribution: ContributionsAndRepositoryData[] =
        json.data.viewer.pullRequests.nodes;

    const total = ({ additions, deletions }: ContributionsAndRepositoryData) =>
        additions + deletions;

    const nameWithOwner = ({ baseRepository }: ContributionsAndRepositoryData) =>
        `${baseRepository.owner.login}/${baseRepository.name}`;

    // remove user repos && private repos
    rawProjectsWithContribution = rawProjectsWithContribution.filter(
        x => x.baseRepository.owner.login !== GITHUB && !x.baseRepository.isPrivate
    );
    // sort
    rawProjectsWithContribution = rawProjectsWithContribution.sort((a, b) =>
        total(a) > total(b) ? -1 : 1
    );
    // remove duplicates
    rawProjectsWithContribution = rawProjectsWithContribution.filter(
        (x, index) =>
            index ===
            rawProjectsWithContribution.findIndex(y => nameWithOwner(x) === nameWithOwner(y))
    );
    // slice
    rawProjectsWithContribution = rawProjectsWithContribution.slice(0, 6);

    const projectsWithContribution: ProjectWithContribution[] = rawProjectsWithContribution.map(
        ({ additions, deletions, baseRepository }) => ({
            ...parseProject(baseRepository),
            additions,
            deletions,
        })
    );

    return projectsWithContribution;
}

interface ContributionsAndRepositoryData {
    additions: number;
    deletions: number;
    baseRepository: RepositoryData & { isPrivate: boolean };
}

const CONTRIBUTIONS = gql`
    {
        viewer {
            pullRequests(
                states: MERGED
                first: 50
                orderBy: { field: CREATED_AT, direction: DESC }
            ) {
                nodes {
                    additions
                    deletions
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
`;
