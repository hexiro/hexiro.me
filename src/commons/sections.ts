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

export const SECTIONS = [
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

export type SectionName = (typeof SECTIONS)[number]["name"];
export const SECTION_NAMES = SECTIONS.map((section) => section.name);

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

export type SocialName = (typeof SOCIALS)[number]["name"];
export const SOCIAL_NAMES = SOCIALS.map((social) => social.name);

export type Section = (typeof SECTIONS)[number];
export type Social = (typeof SOCIALS)[number];
