import React from "react";

import { Position, Size } from "react-tippy";

export interface ParseHTMLProps {
    html: string;
}

export interface KeyValueProps {
    line?: string;
}

export interface TooltipProps {
    title?: string;
    position?: Position;
    distance?: number;
    offset?: number;
    size?: Size;
    children?: React.ReactNode;
    style?: React.CSSProperties;
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
}

export interface FadeInProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
}

export interface SocialMediaProps {
    href: string;
    children?: React.ReactNode;
}
