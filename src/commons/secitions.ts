import { TWITTER_LINK, GITHUB_LINK, LINKED_IN_LINK } from "@/commons/config";
import { HomeIcon, ProjectsIcon, TwitterIcon, GitHubIcon, LinkedInIcon } from "@/commons/icons";

import type { NavRoute, SocialRoute } from "@/layout/Nav";

export const ROUTES: NavRoute[] = [
    {
        name: "Home",
        icon: HomeIcon,
    },
    {
        name: "Projects",
        icon: ProjectsIcon,
    },
];

export const SOCIALS: SocialRoute[] = [
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
];
