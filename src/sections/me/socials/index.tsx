import { extraLightPop } from "commons/animations";
import { TWITTER_LINK, GITHUB_LINK, STEAM_LINK } from "commons/config";
import { TwitterIcon, GithubIcon, SteamIcon } from "commons/icons";
import { Link } from "components/common";

import { Box } from "@chakra-ui/react";

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
            as="li"
            display="inline-block"
            marginX={3}
            transform="auto"
            transitionProperty="transform"
            transitionDuration="fast"
            willChange="transform"
            _first={{ xl: { marginLeft: "unset" } }}
            _hover={extraLightPop}
        >
            <Link href={href}>{icon}</Link>
        </Box>
    );
}
