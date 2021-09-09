import { SocialMedia } from "components/socials/SocialMedia";

import { GithubLink, SteamLink, TwitterLink } from "data/config";
import { fadeParent } from "data/variants";

import { motion } from "framer-motion";
import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";
import styled from "styled-components";

export default function Socials(): JSX.Element {
    return (
        <UnorderedList variants={fadeParent}>
            <SocialMedia href={TwitterLink}>
                <RiTwitterLine />
            </SocialMedia>
            <SocialMedia href={GithubLink}>
                <RiGithubLine />
            </SocialMedia>
            <SocialMedia href={SteamLink}>
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
