import { styled } from "theme";

import { GITHUB_LINK, LINKED_IN_LINK, TWITTER_LINK } from "commons/config";
import {
    DashboardIcon,
    GitHubIcon,
    LinkedInIcon,
    MeIcon,
    ProjectsIcon,
    SkillsIcon,
    TwitterIcon,
} from "commons/icons";
import type { NavRoute } from "components/nav";
import Nav from "components/nav";

const ROUTES: NavRoute[] = [
    {
        name: "Me",
        href: "/",
        icon: MeIcon,
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

export default function Home() {
    return (
        <Page>
            <Nav routes={ROUTES} socials={SOCIALS} />
        </Page>
    );
}

const Page = styled("main", {
    height: "100%",
    width: "100%",
    minHeight: "100vh",
    minWidth: "100vw",
});
