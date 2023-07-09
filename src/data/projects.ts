import { fetchGithubGraphQL, gql } from "@/commons/graphql";

import ipaddr from "ipaddr.js";

export interface IProject {
    name: string;
    description: IExtractedSection[];
    stars: number;
    languages: string[];
    topics: string[];
    url: string;
    packageUrl: string | null;
}

interface IExtractedSection {
    type: "text" | "link";
    value: string;
}

type JsonType = { data: { viewer: { pinnedItems: { nodes: RepositoryData[] } } } };

export async function fetchProjects(): Promise<IProject[]> {
    const resp = await fetchGithubGraphQL(PROJECTS_QUERY);
    const json = (await resp.json()) as JsonType;
    const pinnedItemsData = json.data.viewer.pinnedItems.nodes;

    const projects = pinnedItemsData.map((repository) => parseProject(repository));
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

function parseProject(repository: RepositoryData): IProject {
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

    const description = parseDescription(repository.description);

    const { name, url, stargazerCount: stars } = repository;

    const project: IProject = {
        name,
        description,
        stars,
        languages,
        topics,
        url,
        packageUrl,
    };
    return project;
}

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
