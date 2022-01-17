import gql from "commons/graphql/gql";

export const CONTRIBUTIONS = gql`
    {
        viewer {
            repositoriesContributedTo(
                first: 6
                contributionTypes: [COMMIT]
                includeUserRepositories: false
                orderBy: { field: STARGAZERS, direction: DESC }
                privacy: PUBLIC
                after: "Y3Vyc29yOnYyOpLNKyPOAZci-Q=="
            ) {
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
