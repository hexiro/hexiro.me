import githubGraphQL from "@/commons/graphql";
import gql from "@/commons/graphql/gql";

export interface ProjectData {
    name: string;
    descriptionHTML: string;
    stars: number;
    languages: string[];
    topics: string[];
    url: string;
    packageUrl: string | null;
}

type JsonType = { data: { viewer: { pinnedItems: { nodes: RepositoryData[] } } } };

export default async function projects(): Promise<ProjectData[]> {
    const resp = await githubGraphQL(PROJECTS_QUERY);
    const json = (await resp.json()) as JsonType;
    const pinnedItemsData = json.data.viewer.pinnedItems.nodes;

    const projects = pinnedItemsData.map((repository) => parseProject(repository));
    return projects;
}

// topics that indicate a project is a package
const packageTopics = ["npm", "pypi"] as const;
type PackageTopic = typeof packageTopics[number];

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

    const topicNames = repository.repositoryTopics.nodes.map(({ topic: { name } }) => name);

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

    // @ts-expect-error - string is not equal to string literal -- try and fix this later
    const packageTopicIndex = topics.findIndex((topic) => packageTopics.includes(topic));

    if (packageTopicIndex !== -1) {
        const packageTopic = topics[packageTopicIndex] as PackageTopic;
        packageUrl = parsePackageUrl(repository, packageTopic);

        topics.splice(packageTopicIndex, 1);
    }

    const { name, descriptionHTML, url, stargazerCount: stars } = repository;

    const project: ProjectData = {
        name,
        descriptionHTML,
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
    descriptionHTML: string;
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
                        descriptionHTML
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
