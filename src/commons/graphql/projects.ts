import type { RepositoryProps } from "commons/graphql";
import githubGraphQL from "commons/graphql";
import gql from "commons/graphql/gql";

export default async function projects(): Promise<RepositoryProps[]> {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const resp = await githubGraphQL(PROJECTS);
    const json = await resp.json();
    const projects: RepositoryProps[] = json.data.viewer.pinnedItems.nodes;
    return projects;
}

const PROJECTS = gql`
    {
        viewer {
            pinnedItems(first: 6, types: REPOSITORY) {
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
                        primaryLanguage {
                            name
                        }
                    }
                }
            }
        }
    }
`;
