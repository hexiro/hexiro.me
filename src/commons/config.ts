import {
    AboutIcon,
    ProjectsIcon,
    type IconType,
    SkillsIcon,
    ContactIcon,
} from "@/components/ui/Icons";

// public
export const GITHUB = "hexiro";
export const TWITTER = "hexiiro";
export const DISCORD = "nathlod";
export const DISCORD_SNOWFLAKE = "291632819006865408";
export const LINKED_IN = "nathan-lodge";
export const WAKATIME = "hexiro";

export const GITHUB_LINK = `https://github.com/${GITHUB}` as const;
export const TWITTER_LINK = `https://twitter.com/${TWITTER}` as const;
export const DISCORD_LINK = `https://discord.com/users/${DISCORD}` as const;
export const LINKED_IN_LINK = `https://www.linkedin.com/in/${LINKED_IN}` as const;

// private
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
export const TMDB_V3_TOKEN = process.env.TMDB_V3_TOKEN ?? "";
export const TMDB_V4_TOKEN = process.env.TMDB_V4_TOKEN ?? "";
export const TMDB_ACCOUNT_ID = process.env.TMDB_ACCOUNT_ID ?? "";

export interface IRoute {
    name: string;
    path: string;
}

export type INavRouteName = (typeof ROUTES)[number]["name"];

export const ROUTES = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "About",
        path: "/about",
    },
    {
        name: "Projects",
        path: "/projects",
    },
    {
        name: "Skills",
        path: "/skills",
    },
    {
        name: "Contact",
        path: "/contact",
    },
] as const satisfies readonly IRoute[];
export const NAV_PATHS = ROUTES.map((route) => route.path);

export interface IRouteMeta {
    name: string;
    path: string;
    description: string;
    icon: IconType;
}

export const ROUTES_META = [
    {
        name: "About",
        path: "/about",
        description: "Take a look into a bit of my personal life.",
        icon: AboutIcon,
    },
    {
        name: "Projects",
        path: "/projects",
        description: "Take a look at some of my open-source projects.",
        icon: ProjectsIcon,
    },
    {
        name: "Skills",
        path: "/skills",
        description: "Take a look at my technical skills.",
        icon: SkillsIcon,
    },
    {
        name: "Contact",
        path: "/contact",
        description: "Connect with me through my other socials.",
        icon: ContactIcon,
    },
] as const satisfies readonly IRouteMeta[];
