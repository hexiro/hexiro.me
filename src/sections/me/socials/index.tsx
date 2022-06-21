import { fade } from "commons/animations";
import { TWITTER_LINK, GITHUB_LINK, STEAM_LINK } from "commons/config";
import { TwitterIcon, GithubIcon, SteamIcon } from "commons/icons";
import { To } from "components/common";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SocialMediaProps {
    type: string;
}

export default function SocialMedia({ type }: SocialMediaProps) {
    let href: string;
    let icon;
    const size = 25;
    switch (type.toLowerCase()) {
        case "twitter":
            href = TWITTER_LINK;
            icon = <TwitterIcon size={size} />;
            break;
        case "github":
            href = GITHUB_LINK;
            icon = <GithubIcon size={size} />;
            break;
        case "steam":
            href = STEAM_LINK;
            icon = <SteamIcon size={size} />;
            break;
        default:
            return null;
    }

    return (
        <Box
            as={motion.li}
            variants={fade}
            display="inline-block"
            marginX={3}
            _first={{ xl: { marginLeft: "unset" } }}
        >
            <To href={href}>{icon}</To>
        </Box>
    );
}
