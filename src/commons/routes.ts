import { TWITTER_LINK, GITHUB_LINK, LINKED_IN_LINK } from "@/commons/config";
import type { IconType } from "@/commons/icons";
import {
    HomeIcon,
    AboutIcon,
    ProjectsIcon,
    ToolsIcon,
    DashboardIcon,
    TwitterIcon,
    GitHubIcon,
    LinkedInIcon,
} from "@/commons/icons";

interface Route {
    name: string;
    href: Lowercase<string>;
    icon: IconType;
}

export const PAGE_ROUTES = [
    {
        name: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        name: "About",
        href: "/about",
        icon: AboutIcon,
    },
    {
        name: "Projects",
        href: "/projects",
        icon: ProjectsIcon,
    },
    {
        name: "Tools",
        href: "/tools",
        icon: ToolsIcon,
        
    },
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon,
    },

] as const satisfies readonly Route[];

export type PageRouteName = (typeof PAGE_ROUTES)[number]["name"];
export type PageRouteHref = (typeof PAGE_ROUTES)[number]["href"];
export const PAGE_ROUTE_NAMES = PAGE_ROUTES.map((pageRoute) => pageRoute.name);

export const SOCIAL_ROUTES = [
    {
        name: "Twitter",
        href: TWITTER_LINK,
        icon: TwitterIcon,
    },
    {
        name: "GitHub",
        href: GITHUB_LINK,
        icon: GitHubIcon,
    },
    {
        name: "LinkedIn",
        href: LINKED_IN_LINK,
        icon: LinkedInIcon,
    },
] as const satisfies readonly Route[];

export type SocialRouteName = (typeof SOCIAL_ROUTES)[number]["name"];
export type SocialRouteHref = (typeof SOCIAL_ROUTES)[number]["href"];
export const SOCIAL_ROUTE_NAMES = SOCIAL_ROUTES.map((socialRoute) => socialRoute.name);

export type PageRouteType = (typeof PAGE_ROUTES)[number];
export type SocialRouteType = (typeof SOCIAL_ROUTES)[number];
