import { SocialMedia } from "components/socials/SocialMedia";
import { GithubLink, SteamLink, TwitterLink } from "data/config";

import { RiGithubLine, RiSteamLine, RiTwitterLine } from "react-icons/ri";

const Socials = (): JSX.Element => (
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
export default Socials;
