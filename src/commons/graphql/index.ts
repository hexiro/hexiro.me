import { GITHUB_TOKEN } from "commons/config";

export * from "commons/graphql/project";

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
