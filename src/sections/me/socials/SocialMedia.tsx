import { fade, pop } from "commons/animations";
import { TWITTER_LINK, GITHUB_LINK, STEAM_LINK } from "commons/config";
import { TwitterIcon, GithubIcon, SteamIcon } from "commons/icons";
import { Header, To } from "components/common";

import { motion } from "framer-motion";
import styled from "styled-components";

interface SocialMediaProps {
    type: string;
}

export default function SocialMedia({ type }: SocialMediaProps) {
    let href: string;
    let icon;

    switch (type.toLowerCase()) {
        case "twitter":
            href = TWITTER_LINK;
            icon = <TwitterIcon />;
            break;
        case "github":
            href = GITHUB_LINK;
            icon = <GithubIcon />;
            break;
        case "steam":
            href = STEAM_LINK;
            icon = <SteamIcon />;
            break;
        default:
            return null;
    }

    return (
        <SocialItem variants={fade}>
            <To href={href}>{icon}</To>
        </SocialItem>
    );
}

const SocialItem = styled(motion.li)`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
    cursor: pointer;
`;
