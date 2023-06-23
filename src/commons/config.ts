// public
export const GITHUB = "hexiro";
export const TWITTER = "hexiiro";
export const DISCORD = "nathlod";
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

export interface INavRoute {
    name: string;
    path: string;
}

export type INavRouteName = (typeof NAV_ROUTES)[number]["name"];

export const NAV_ROUTES = [
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
] as const satisfies readonly INavRoute[];
