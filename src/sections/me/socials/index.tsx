import { extraLightPop } from "commons/animations";
import { TWITTER_LINK, GITHUB_LINK, DISCORD_LINK } from "commons/config";
import { TwitterIcon, GithubIcon, DiscordIcon } from "commons/icons";
import { Link } from "components/common";

import type { ComponentWithAs, IconProps } from "@chakra-ui/react";
import { Box, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface SocialMediaProps {
    type: string;
}

export default function SocialMedia({ type }: SocialMediaProps) {
    let href: string;
    let icon: IconType | ComponentWithAs<"svg", IconProps>;
    switch (type.toLowerCase()) {
        case "twitter":
            href = TWITTER_LINK;
            icon = TwitterIcon;
            break;
        case "github":
            href = GITHUB_LINK;
            icon = GithubIcon;
            break;
        case "discord":
            href = DISCORD_LINK;
            icon = DiscordIcon;
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
            boxSize={5}
        >
            <Link href={href}>
                <Icon boxSize={5} color="brand.primary" as={icon} />
            </Link>
        </Box>
    );
}
