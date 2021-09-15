import { GithubToken } from "static/config";

export * from "static/graphql/project";

export default async function GraphQL(query: string): Promise<Response> {
    return await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `token ${GithubToken}`,
        },
        body: JSON.stringify({ query }),
    });
}
