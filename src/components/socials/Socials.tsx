import { SocialMedia as RawSocialMedia } from "components/socials/SocialMedia";

import { GithubLink, SteamLink, TwitterLink } from "data/config";

import FadeIn from "react-fade-in";
import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";
import styled from "styled-components";

const SocialMedia = styled(RawSocialMedia)``;

export default function Socials(props: SocialsProps): JSX.Element {
    return (
        <UnorderedList {...props}>
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

interface SocialsProps {
    delay?: number;
    transitionDuration?: number;
}

const UnorderedList = styled(FadeIn).attrs(() => ({
    wrapperTag: "ul",
    childTag: "span",
}))`
    & > :last-child {
        margin-right: unset;
    }
`;