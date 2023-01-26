import { globalStyles, styled } from "@/theme";

import type { AppProps } from "next/app";

import { TWITTER_LINK, GITHUB_LINK, LINKED_IN_LINK } from "@/commons/config";
import {
    HomeIcon,
    ProjectsIcon,
    SkillsIcon,
    DashboardIcon,
    TwitterIcon,
    GitHubIcon,
    LinkedInIcon,
} from "@/commons/icons";
import type { NavRoute } from "@/layout/Nav";
import Nav from "@/layout/Nav";

import "react-tippy/dist/tippy.css";

export default function App({ Component, pageProps, router }: AppProps) {
    globalStyles();

    const index = ROUTES.findIndex(({ href }) => href === router.pathname.toLowerCase());

    return (
        <Body>
            <Nav routes={ROUTES} socials={SOCIALS} index={index} />
            <Component {...pageProps} />
        </Body>
    );
}

const ROUTES: NavRoute[] = [
    {
        name: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        name: "Projects",
        href: "/projects",
        icon: ProjectsIcon,
    },
    {
        name: "Skills",
        href: "/skills",
        icon: SkillsIcon,
    },
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: DashboardIcon,
    },
];

const SOCIALS: NavRoute[] = [
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

const Body = styled("div", {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    minHeight: "100vh",
    minWidth: "100vw",
});
