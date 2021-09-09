import { Github, GithubToken } from "static/config";

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

export const REPOS_QUERY = `
{
  user(login: "${Github}") {
    pinnedItems(first: 3, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          descriptionHTML
          url
          owner {
            login
          }
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
          primaryLanguage {
            name
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
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

export interface ProjectProps {
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
    pullRequests: {
        totalCount: number;
    };
    issues: {
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
