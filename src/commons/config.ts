import {
    AboutIcon,
    ProjectsIcon,
    type IconType,
    SkillsIcon,
    ContactIcon,
    PythonIcon,
    TypeScriptIcon,
    HTMLIcon,
    CSSIcon,
    ReactIcon,
    EmailIcon,
    GitHubIcon,
    LinkedInIcon,
    DiscordIcon,
    TwitterIcon,
} from "@/components/ui/Icons";

// public
export const GITHUB = "hexiro";
export const TWITTER = "hexiiro";
export const DISCORD = "nathlod";
export const EMAIL = "contact@hexiro.me";
export const DISCORD_SNOWFLAKE = "291632819006865408";
export const LINKED_IN = "nathan-lodge";
export const WAKATIME = "hexiro";

export const EMAIL_LINK = `mailto:${EMAIL}` as const;
export const GITHUB_LINK = `https://github.com/${GITHUB}` as const;
export const TWITTER_LINK = `https://twitter.com/${TWITTER}` as const;
export const DISCORD_LINK = `https://discord.com/users/${DISCORD}` as const;
export const LINKED_IN_LINK = `https://www.linkedin.com/in/${LINKED_IN}` as const;

// private
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

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

export interface ISkill {
    name: string;
    icon: IconType;
}

export type ISkillGroups = Record<string, ISkill[]>;

export const SKILLS = {
    "Languages": [
        {
            name: "Python",
            icon: PythonIcon,
        },
        {
            name: "TypeScript",
            icon: TypeScriptIcon,
        },
        {
            name: "HTML",
            icon: HTMLIcon,
        },
        {
            name: "CSS",
            icon: CSSIcon,
        },
    ],

    "Frameworks / Libraries": [
        {
            name: "React",
            icon: ReactIcon,
        },
    ],
} satisfies ISkillGroups;

export interface ISocial {
    name: string;
    value: string;
    link: string;
    icon: IconType;
}

export const SOCIALS = [
    {
        name: "Email",
        value: EMAIL,
        link: EMAIL_LINK,
        icon: EmailIcon,
    },
    {
        name: "GitHub",
        value: GITHUB,
        link: GITHUB_LINK,
        icon: GitHubIcon,
    },
    {
        name: "LinkedIn",
        value: LINKED_IN,
        link: LINKED_IN_LINK,
        icon: LinkedInIcon,
    },
    {
        name: "Discord",
        value: DISCORD,
        link: DISCORD_LINK,
        icon: DiscordIcon,
    },
    {
        name: "Twitter",
        value: TWITTER,
        link: TWITTER_LINK,
        icon: TwitterIcon,
    },
] as const satisfies readonly ISocial[];
