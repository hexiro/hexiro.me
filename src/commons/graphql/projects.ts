import githubGraphQL from "@/commons/graphql";
import gql from "@/commons/graphql/gql";

export interface Project {
    name: string;
    descriptionHTML: string;
    url: string;
    ownerName: string;
    totalStars: number;
    totalForks: number;
    languages: string[];
}

type JsonType = { data: { viewer: { pinnedItems: { nodes: RepositoryData[] } } } };

export default async function projects(): Promise<Project[]> {
    const resp = await githubGraphQL(PROJECTS);
    const json = (await resp.json()) as JsonType;
    const rawProjects = json.data.viewer.pinnedItems.nodes;
    const projects = rawProjects.map((rawProject) => parseProject(rawProject));
    return projects;
}

export const parseProject = (rawProject: RepositoryData): Project => {
    const { totalSize } = rawProject.languages;

    // 3% of the total and it counts with a max of 3
    const languages = rawProject.languages.edges
        .filter(({ size }) => size / totalSize >= 0.03)
        .map(({ node }) => node.name)
        .slice(0, 3);

    const project: Project = {
        name: rawProject.name,
        descriptionHTML: rawProject.descriptionHTML,
        url: rawProject.url,
        ownerName: rawProject.owner.login,
        totalStars: rawProject.stargazers.totalCount,
        totalForks: rawProject.forks.totalCount,
        languages,
    };
    return project;
};

export interface RepositoryData {
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
    primaryLanguage: {
        name: string;
    };
    languages: {
        edges: Array<{
            size: number;
            node: {
                name: string;
            };
        }>;
        totalSize: number;
    };
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
