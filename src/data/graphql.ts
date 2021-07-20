import { GithubToken } from "./config";

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