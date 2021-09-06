import { SocialMedia } from "components/socials/SocialMedia";

import { GithubLink, SteamLink, TwitterLink } from "data/config";

import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";

export default function Socials(): JSX.Element {
    return (
        <ul>
            <SocialMedia href={TwitterLink}>
                <RiTwitterLine />
            </SocialMedia>
            <SocialMedia href={GithubLink}>
                <RiGithubLine />
            </SocialMedia>
            <SocialMedia href={SteamLink}>
                <RiSteamLine />
            </SocialMedia>
        </ul>
    );
}
