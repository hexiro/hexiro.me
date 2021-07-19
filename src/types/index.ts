export interface Timestamps {
    start?: number | null;
    end?: number | null;
}

export interface ErrorPage {
    status: number | string;
    message?: string;
}

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

export interface HomeProps {
    projects: ProjectProps[];
    age: number;
}