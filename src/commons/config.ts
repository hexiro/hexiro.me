import type { IconType } from "@/components/ui/Icons";
import {
    AboutIcon,
    ProjectsIcon,
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
    IMDbIcon,
    SpotifyIcon,
    SteamIcon,
    EpicGamesIcon,
    LastFmIcon,
    NextIcon,
    TailwindCSSIcon,
    SocketIOIcon,
    FastAPIIcon,
    ExpressIcon,
    FastifyIcon,
    CodeIcon,
    RedisIcon,
    MongoDBIcon,
    PostgreSQLIcon,
    DockerIcon,
    GitIcon,
    FigmaIcon,
    PostmanIcon,
    SentryIcon,
    PytestIcon,
    ESLintIcon,
    RuffIcon,
    PoetryIcon,
    YarnIcon,
    VercelIcon,
    CloudflareIcon,
    HerokuIcon,
    YouTubeIcon,
    InstagramIcon,
} from "@/components/ui/Icons";

import type { Data as LanyardData } from "use-lanyard";

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

const BIRTHDAY = Date.parse("2005-07-02T00:00:00-0500");
const ONE_YEAR_IN_MILLISECONDS = 31556952000;
export const currentAge = () => Math.floor((Date.now() - BIRTHDAY) / ONE_YEAR_IN_MILLISECONDS);

export const INITIAL_DISCORD_STATE = {
    discord_user: {
        username: "nathlod",
        public_flags: 4194432,
        id: DISCORD_SNOWFLAKE,
        global_name: "nathan",
        display_name: "nathan",
        discriminator: "0",
        bot: false,
        avatar_decoration: null,
        avatar: "30a5d8423b9471d72a374883a80089b9",
    },
    spotify: null,
    listening_to_spotify: false,
    kv: {},
    discord_status: "offline",
    activities: [],
    active_on_discord_web: false,
    active_on_discord_mobile: false,
    active_on_discord_desktop: true,
} satisfies LanyardData;

// private
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

export interface IRoute {
    name: string;
    path: string;
}

export type INavRouteName = (typeof ROUTES)[number]["name"];
export type INavRoutePath = (typeof ROUTES)[number]["path"];

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
    link: string;
}

export type ISkillGroups = Record<string, ISkill[]>;

export const SKILLS = {
    Languages: [
        {
            name: "Python",
            icon: PythonIcon,
            link: "https://www.python.org",
        },
        {
            name: "TypeScript",
            icon: TypeScriptIcon,
            link: "https://www.typescriptlang.org",
        },
        {
            name: "HTML",
            icon: HTMLIcon,
            link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        },
        {
            name: "CSS",
            icon: CSSIcon,
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        },
    ],

    "Frameworks / Libraries": [
        {
            name: "Next.js",
            icon: NextIcon,
            link: "https://nextjs.org",
        },
        {
            name: "React",
            icon: ReactIcon,
            link: "https://react.dev",
        },
        {
            name: "Tailwind CSS",
            icon: TailwindCSSIcon,
            link: "https://tailwindcss.com",
        },
        {
            name: "Socket.IO",
            icon: SocketIOIcon,
            link: "https://socket.io",
        },
        {
            name: "FastAPI",
            icon: FastAPIIcon,
            link: "https://fastapi.tiangolo.com",
        },
        {
            name: "Express",
            icon: ExpressIcon,
            link: "https://expressjs.com",
        },
        {
            name: "Fastify",
            icon: FastifyIcon,
            link: "https://www.fastify.io",
        },
        {
            name: "Click",
            icon: CodeIcon,
            link: "https://click.palletsprojects.com",
        },
    ],
    "Databases / Datastores": [
        {
            name: "Redis",
            icon: RedisIcon,
            link: "https://redis.io",
        },
        {
            name: "MongoDB",
            icon: MongoDBIcon,
            link: "https://www.mongodb.com",
        },
        {
            name: "PostgreSQL",
            icon: PostgreSQLIcon,
            link: "https://www.postgresql.org",
        },
    ],
    "Tooling / Software": [
        {
            name: "Docker",
            icon: DockerIcon,
            link: "https://www.docker.com",
        },
        {
            name: "Git",
            icon: GitIcon,
            link: "https://git-scm.com",
        },
        {
            name: "Figma",
            icon: FigmaIcon,
            link: "https://www.figma.com",
        },
        {
            name: "Postman",
            icon: PostmanIcon,
            link: "https://www.postman.com",
        },
        {
            name: "Sentry",
            icon: SentryIcon,
            link: "https://sentry.io",
        },
        {
            name: "Pytest",
            icon: PytestIcon,
            link: "https://pytest.org",
        },
        {
            name: "ESLint",
            icon: ESLintIcon,
            link: "https://eslint.org",
        },
        {
            name: "Mypy",
            icon: CodeIcon,
            link: "https://mypy-lang.org",
        },
        {
            name: "Ruff",
            icon: RuffIcon,
            link: "https://beta.ruff.rs/docs/",
        },
        {
            name: "Rich",
            icon: CodeIcon,
            link: "https://rich.readthedocs.io",
        },
        {
            name: "Poetry",
            icon: PoetryIcon,
            link: "https://python-poetry.org",
        },
        {
            name: "Yarn",
            icon: YarnIcon,
            link: "https://yarnpkg.com",
        },
    ],
    Services: [
        {
            name: "Vercel",
            icon: VercelIcon,
            link: "https://vercel.com",
        },
        {
            name: "GitHub",
            icon: GitHubIcon,
            link: "https://github.com",
        },
        {
            name: "Cloudflare",
            icon: CloudflareIcon,
            link: "https://www.cloudflare.com",
        },
        {
            name: "Heroku",
            icon: HerokuIcon,
            link: "https://www.heroku.com",
        },
    ],
} satisfies ISkillGroups;

export interface ISocial {
    name: string;
    value: string;
    link?: string;
    icon: IconType;
    // name isn't a part of the url or url can't be found with just name
    canCopy: boolean;
}

export const SOCIALS = [
    {
        name: "Email",
        value: EMAIL,
        link: EMAIL_LINK,
        icon: EmailIcon,
        canCopy: true,
    },
    {
        name: "GitHub",
        value: GITHUB,
        link: GITHUB_LINK,
        icon: GitHubIcon,
        canCopy: true,
    },
    {
        name: "LinkedIn",
        value: LINKED_IN,
        link: LINKED_IN_LINK,
        icon: LinkedInIcon,
        canCopy: true,
    },
    {
        name: "Discord",
        value: DISCORD,
        link: DISCORD_LINK,
        icon: DiscordIcon,
        canCopy: true,
    },
    {
        name: "Twitter",
        value: TWITTER,
        link: TWITTER_LINK,
        icon: TwitterIcon,
        canCopy: true,
    },

    {
        name: "Steam",
        value: "hexiro",
        link: "https://steamcommunity.com/id/hexiro",
        icon: SteamIcon,
        canCopy: true,
    },
    {
        name: "Instagram",
        value: "nlodge0702",
        link: "https://www.instagram.com/nlodge0702/",
        icon: InstagramIcon,
        canCopy: true,
    },

    {
        name: "Spotify",
        value: "nathlod",
        link: "https://open.spotify.com/user/egmkzyon22fnuy7vfgalpxi4p",
        icon: SpotifyIcon,
        canCopy: false,
    },
    {
        name: "Last.fm",
        value: "nathlodge",
        link: "https://www.last.fm/user/nathlodge",
        icon: LastFmIcon,
        canCopy: true,
    },
    {
        name: "YouTube",
        value: "nathlod",
        link: "https://www.youtube.com/@nathlod/videos",
        icon: YouTubeIcon,
        canCopy: true,
    },
    {
        name: "Epic Games",
        value: "hexiro",
        icon: EpicGamesIcon,
        canCopy: true,
    },
    {
        name: "IMDb",
        value: "nathlod",
        link: "https://www.imdb.com/user/ur154442245/",
        icon: IMDbIcon,
        canCopy: false,
    },
] as const satisfies readonly ISocial[];

type ISocialName = (typeof SOCIALS)[number]["name"];

export const SOCIALS_MAP = SOCIALS.reduce<Record<ISocialName, ISocial>>((acc, social) => {
    acc[social.name] = social;
    return acc;
}, {} as Record<ISocialName, ISocial>);
