import { fetchGithubGraphQL, gql } from "@/commons/graphql";

export interface ProjectData {
    name: string;
    description: string;
    stars: number;
    languages: string[];
    topics: string[];
    url: string;
    packageUrl: string | null;
}

type JsonType = { data: { viewer: { pinnedItems: { nodes: RepositoryData[] } } } };

export default async function projects(): Promise<ProjectData[]> {
    const resp = await fetchGithubGraphQL(PROJECTS_QUERY);
    const json = (await resp.json()) as JsonType;
    const pinnedItemsData = json.data.viewer.pinnedItems.nodes;

    const projects = pinnedItemsData.map((repository) => parseProject(repository));
    return projects;
}

// topics that indicate a project is a package
const packageTopics = ["npm", "pypi"] as const;
type PackageTopic = (typeof packageTopics)[number];

const parsePackageUrl = (repository: RepositoryData, packageTopic: PackageTopic): string | null => {
    switch (packageTopic) {
        case "npm":
            return `https://www.npmjs.com/package/${repository.name}`;
        case "pypi":
            return `https://pypi.org/project/${repository.name}`;
        default:
            return null;
    }
};

const parseProject = (repository: RepositoryData): ProjectData => {
    const { totalSize } = repository.languages;

    // each language has to be at least 10% of the total size of the repository
    const languages = repository.languages.edges
        .sort((a, b) => b.size - a.size)
        .filter(({ size }) => size / totalSize >= 0.1)
        .map(({ node }) => node.name.toLowerCase())
        .slice(0, 3);

    const topics = repository.repositoryTopics.nodes
        .map(({ topic }) => topic.name.toLowerCase())
        .filter((topic) => !languages.includes(topic));

    let packageUrl: string | null = null;

    const packageTopicIndex = topics.findIndex((topic) =>
        packageTopics.includes(topic as PackageTopic)
    );

    if (packageTopicIndex !== -1) {
        const packageTopic = topics[packageTopicIndex] as PackageTopic;
        packageUrl = parsePackageUrl(repository, packageTopic);

        topics.splice(packageTopicIndex, 1);
    }

    const { name, description, url, stargazerCount: stars } = repository;

    const project: ProjectData = {
        name,
        description,
        stars,
        languages,
        topics,
        url,
        packageUrl,
    };
    return project;
};

interface RepositoryData {
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    languages: {
        edges: Array<{
            size: number;
            node: {
                name: string;
            };
        }>;
        totalSize: number;
    };
    repositoryTopics: {
        nodes: Array<{
            topic: {
                name: string;
            };
        }>;
    };
}

const PROJECTS_QUERY = gql`
    {
        viewer {
            pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        name
                        description
                        url
                        stargazerCount
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
                        repositoryTopics(first: 10) {
                            nodes {
                                ... on RepositoryTopic {
                                    topic {
                                        name
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
