import { TWITTER_LINK, GITHUB_LINK, LINKED_IN_LINK } from "@/commons/config";
import type { IconType } from "@/commons/icons";
import {
    HomeIcon,
    ProjectsIcon,
    TwitterIcon,
    GitHubIcon,
    LinkedInIcon,
    DashboardIcon,
} from "@/commons/icons";

interface Route {
    name: string;
    href: string;
    icon: IconType;
}

export const PAGE_ROUTES = ([
    {
        name: "Home",
        href: "/",
        icon: HomeIcon as IconType,
    },
    {
        name: "Projects",
        href: "/projects",
        icon: ProjectsIcon as IconType,
    },
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon as IconType,
    },
] as const) satisfies readonly Route[];

export type PageRouteName = (typeof PAGE_ROUTES)[number]["name"];
export const PAGE_ROUTE_NAMES = PAGE_ROUTES.map((pageRoute) => pageRoute.name);

export const SOCIAL_ROUTES = ([
    {
        name: "Twitter",
        href: TWITTER_LINK,
        icon: TwitterIcon as IconType,
    },
    {
        name: "GitHub",
        href: GITHUB_LINK,
        icon: GitHubIcon as IconType,
    },
    {
        name: "LinkedIn",
        href: LINKED_IN_LINK,
        icon: LinkedInIcon as IconType,
    },
] as const) satisfies readonly Route[];

export type SocialRouteName = (typeof SOCIAL_ROUTES)[number]["name"];
export const SOCIAL_ROUTE_NAMES = SOCIAL_ROUTES.map((socialRoute) => socialRoute.name);

export type PageRoute = (typeof PAGE_ROUTES)[number];
export type SocialRoute = (typeof SOCIAL_ROUTES)[number];
