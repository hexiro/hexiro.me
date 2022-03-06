import { GITHUB } from "commons/config";
import type { PullRequestProps } from "commons/graphql";
import githubGraphQL from "commons/graphql";
import gql from "commons/graphql/gql";

export default async function contributions(): Promise<PullRequestProps[]> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const resp = await githubGraphQL(CONTRIBUTIONS);
    const json = await resp.json();
    let contributions: PullRequestProps[];

    const total = ({ additions, deletions }: PullRequestProps) => additions + deletions;

    const nameWithOwner = ({ baseRepository }: PullRequestProps) =>
        `${baseRepository.owner.login}/${baseRepository.name}`;

    contributions = json.data.viewer.pullRequests.nodes;
    // remove user repos
    contributions = contributions.filter(x => x.baseRepository.owner.login !== GITHUB);
    // sort
    contributions = contributions.sort((a, b) => (total(a) > total(b) ? -1 : 1));
    // remove duplicates
    contributions = contributions.filter(
        (x, index) => index === contributions.findIndex(y => nameWithOwner(x) === nameWithOwner(y))
    );
    // slice
    contributions = contributions.slice(0, 6);
    return contributions;
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
                        owner {
                            login
                        }
                        stargazers {
                            totalCount
                        }
                        forks {
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
