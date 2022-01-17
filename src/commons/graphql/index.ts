import { GITHUB_TOKEN } from "commons/config";

export { PROJECTS } from "commons/graphql/project";
export { CONTRIBUTIONS } from "commons/graphql/contributions";

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

export interface Repository {
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
    defaultBranchRef: {
        target: {
            history: {
                totalCount: number;
            };
        };
    };
}
