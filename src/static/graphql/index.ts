import { GITHUB_TOKEN } from "static/config";

export * from "static/graphql/project";

export default async function graphQL(query: string): Promise<Response> {
    return await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `token ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query }),
    });
}
