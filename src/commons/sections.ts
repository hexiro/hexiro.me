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

export const ROUTES = [
    {
        name: "Home",
        icon: HomeIcon as IconType,
    },
    {
        name: "Projects",
        icon: ProjectsIcon as IconType,
    },
    {
        name: "Dashboard",
        icon: DashboardIcon as IconType,
    },
] as const;

export type RouteName = (typeof ROUTES)[number]["name"];
export const ROUTE_NAMES = ROUTES.map((route) => route.name);

export const SOCIALS = [
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
] as const;

export type SocialsName = (typeof SOCIALS)[number]["name"];
export const SOCIALS_NAMES = SOCIALS.map((social) => social.name);

export type NavSection = (typeof ROUTES)[number];
export type NavSocial = (typeof SOCIALS)[number];
