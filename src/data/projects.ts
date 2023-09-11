import { fetchGithubGraphQL, gql } from "@/commons/graphql";

import ipaddr from "ipaddr.js";

export interface IProject {
    name: string;
    description: IExtractedSection[];
    stars: number;
    url: string;
    // 'Date' isn't serializable
    updatedAt: string;
    languages: string[];
    topics: string[];
    packageUrl: string | null;
    pinnedIndex: number | null;
}

interface IExtractedSection {
    type: "text" | "link";
    value: string;
}

type JsonType = {
    data: {
        viewer: {
            pinnedItems: { nodes: PinnedItemData[] };
            repositories: { nodes: RepositoryData[] };
        };
    };
};

export async function fetchProjects(): Promise<IProject[]> {
    const resp = await fetchGithubGraphQL(PROJECTS_QUERY);
    const json = (await resp.json()) as JsonType;

    const {
        pinnedItems: { nodes: pinnedItems },
        repositories: { nodes: repositories },
    } = json.data.viewer;

    const projects = parseProjects(repositories, pinnedItems);
    return projects;
}

// topics that indicate a project is a package
const packageTopics = ["npm", "pypi"] as const;
type PackageTopic = (typeof packageTopics)[number];

function parsePackageUrl(repository: RepositoryData, packageTopic: PackageTopic): string | null {
    switch (packageTopic) {
        case "npm":
            return `https://www.npmjs.com/package/${repository.name}`;
        case "pypi":
            return `https://pypi.org/project/${repository.name}`;
        default:
            return null;
    }
}

const URL_REGEX =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gm;

function parseDescription(description: string): IExtractedSection[] {
    const isPublicUrl = (match: RegExpMatchArray): boolean => {
        let url: URL;
        try {
            url = new URL(match[0]);
        } catch (e: unknown) {
            // not valid url -- bad
            return false;
        }

        let ip: ReturnType<typeof ipaddr.process>;
        try {
            ip = ipaddr.process(url.hostname);
        } catch (e: unknown) {
            // not ip -- good
            return true;
        }

        if (ip.kind() === "ipv6") return false;
        if (ip.range() === "private") return false;

        return true;
    };

    let linkMatches: RegExpMatchArray[];
    linkMatches = Array.from(description.matchAll(URL_REGEX));
    linkMatches = linkMatches.filter(isPublicUrl);

    if (linkMatches.length === 0) return [{ type: "text", value: description }];

    const sections: IExtractedSection[] = [];
    let start = 0;

    for (const linkMatch of linkMatches) {
        const link = linkMatch[0];
        const { index } = linkMatch;

        if (index === undefined) continue;

        sections.push({ value: description.slice(start, index), type: "text" });
        sections.push({ value: link, type: "link" });

        start = index + link.length;
    }

    return sections;
}

function parsePinnedIndex(
    repository: RepositoryData,
    pinnedItems: PinnedItemData[]
): number | null {
    const { id } = repository;

    const pinnedIndex = pinnedItems.findIndex((item) => item.id === id);
    if (pinnedIndex === -1) return null;

    return pinnedIndex;
}

function parseProjects(repositories: RepositoryData[], pinnedItems: PinnedItemData[]): IProject[] {
    const projects = repositories
        .map((repository) => parseProject(repository, pinnedItems))
        .filter((project): project is IProject => project !== null);
    return projects;
}

function parseProject(repository: RepositoryData, pinnedItems: PinnedItemData[]): IProject | null {
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

    if (repository.description === null) return null;

    const description = parseDescription(repository.description);
    const pinnedIndex = parsePinnedIndex(repository, pinnedItems);

    const { name, url, pushedAt: updatedAt, stargazerCount: stars } = repository;

    const project: IProject = {
        name,
        description,
        stars,
        url,
        updatedAt,
        languages,
        topics,
        packageUrl,
        pinnedIndex,
    };
    return project;
}

interface PinnedItemData {
    id: string;
}

interface RepositoryData {
    id: string;
    name: string;
    description: string | null;
    url: string;
    stargazerCount: number;
    pushedAt: string;
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

// only shows first 100 public non-fork repos,
// if i have more than 100 public repos, i have bigger problems
const PROJECTS_QUERY = gql`
    {
        viewer {
            pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        id
                    }
                }
            }
            repositories(
                first: 100
                affiliations: [OWNER]
                ownerAffiliations: [OWNER]
                privacy: PUBLIC
                isFork: false
            ) {
                nodes {
                    id
                    name
                    description
                    url
                    stargazerCount
                    pushedAt
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
`;
