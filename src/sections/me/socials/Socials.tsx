import { fadeChildren } from "commons/animations";
import { GITHUB_LINK, STEAM_LINK, TWITTER_LINK } from "commons/config";
import { GithubIcon, SteamIcon, TwitterIcon } from "commons/icons";
import { SocialMedia } from "sections/me/socials/SocialMedia";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import styled from "styled-components";

export default function Socials(props?: HTMLMotionProps<"ul">): JSX.Element {
    return (
        <UnorderedList {...props}>
            <SocialMedia href={TWITTER_LINK}>
                <TwitterIcon />
            </SocialMedia>
            <SocialMedia href={GITHUB_LINK}>
                <GithubIcon />
            </SocialMedia>
            <SocialMedia href={STEAM_LINK}>
                <SteamIcon />
            </SocialMedia>
        </UnorderedList>
    );
}

const UnorderedList = styled(motion.ul)`
    margin-top: 5px;

    & > :last-child {
        margin-right: unset;
    }
`;
