import { fadeParent } from "commons/animations";
import { GITHUB_LINK, STEAM_LINK, TWITTER_LINK } from "commons/config";
import { SocialMedia } from "sections/me/socials/SocialMedia";

import { motion } from "framer-motion";
import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";
import styled from "styled-components";

export default function Socials(): JSX.Element {
    return (
        <UnorderedList variants={fadeParent}>
            <SocialMedia href={TWITTER_LINK}>
                <RiTwitterLine />
            </SocialMedia>
            <SocialMedia href={GITHUB_LINK}>
                <RiGithubLine />
            </SocialMedia>
            <SocialMedia href={STEAM_LINK}>
                <RiSteamLine />
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
