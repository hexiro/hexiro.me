import { SocialMedia } from "components/socials/SocialMedia";

import { GITHUB_LINK, STEAM_LINK, TWITTER_LINK } from "commons/config";
import { fadeParent } from "commons/variants";

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
    margin-top: 10px;
    position: absolute;

    & > :last-child {
        margin-right: unset;
    }

    @media only screen and (max-width: 1250px) {
        position: unset;
    }
`;
