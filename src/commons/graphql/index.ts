import { GITHUB_TOKEN } from "commons/config";

export default async function githubGraphQL(query: string): Promise<Response> {
    return fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `token ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query }),
    });
}

export interface RepositoryProps {
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
        name: string | null;
    };
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number;
            };
        };
    };
}

export interface PullRequestProps {
    additions: number;
    deletions: number;
    baseRepository: RepositoryProps;
}
