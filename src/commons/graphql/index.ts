import { GITHUB_TOKEN } from "@/commons/config";

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
