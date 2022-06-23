import Image from "next/image";

import { Box, Flex, Hide, Text, Tooltip } from "@chakra-ui/react";

import { DISCORD } from "commons/config";
import { AnimatePresence } from "framer-motion";
import type { Activity } from "use-lanyard";
import { useLanyardWs } from "use-lanyard";

export default function Lanyard(): JSX.Element | null {
    const data = useLanyardWs(DISCORD);

    const activity = data?.activities?.find(act => act.type === 0);

    let content: LanyardContent | null = null;

    if (activity) {
        content = handleGame(activity);
    }

    const { name, largeImage, largeText, smallImage, smallText, firstLine, secondLine } =
        content ?? {};

    return (
        <AnimatePresence>
            {content && largeImage && largeText && (
                <Hide below="sm">
                    <Flex
                        position="relative"
                        padding={5}
                        marginTop={5}
                        width={96}
                        boxShadow="md"
                        borderRadius="lg"
                        background="background.secondary"
                    >
                        <Box
                            height="95px"
                            position="relative"
                            sx={{
                                "& img": {
                                    borderRadius: "base",
                                    boxShadow: "sm",
                                },
                            }}
                        >
                            <Tooltip label={largeText} placement="top">
                                <Box>
                                    <Image
                                        priority
                                        alt="large image of application"
                                        draggable={false}
                                        src={largeImage}
                                        layout="fixed"
                                        height={95}
                                        width={95}
                                    />
                                </Box>
                            </Tooltip>
                            {smallImage && (
                                <Tooltip label={smallText} placement="top">
                                    <Box
                                        position="absolute"
                                        right="-8px"
                                        bottom="-8px"
                                        height="34px"
                                        width="34px"
                                        sx={{
                                            "& > :first-child": {
                                                borderRadius: "50%!important",
                                                border: "2px solid!important",
                                                borderColor:
                                                    "var(--chakra-colors-brand-primary)!important",
                                            },
                                        }}
                                    >
                                        <Image
                                            alt="small image of application"
                                            draggable={false}
                                            src={smallImage}
                                            height={30}
                                            width={30}
                                        />
                                    </Box>
                                </Tooltip>
                            )}
                        </Box>
                        <Flex
                            position="relative"
                            direction="column"
                            width={60}
                            textAlign="left"
                            paddingLeft={4}
                            sx={{
                                "h3, h5": {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                },
                                "h5": {
                                    lineHeight: "short",
                                },
                            }}
                        >
                            <Text as="h3" paddingBottom={0.5}>
                                {name}
                            </Text>
                            <Text as="h5">{firstLine}</Text>
                            <Text as="h5">{secondLine}</Text>
                        </Flex>
                    </Flex>
                </Hide>
            )}
        </AnimatePresence>
    );
}

// display: flex;
//     width: 250px;
//     flex-direction: column;
//     position: relative;
//     padding-left: 20px;
//     text-align: left;

//
//     & h4 {
//         margin-bottom: 2px;
//     }
//     & h5 {
//         color: ${theme.core.subtext};
//         align-items: flex-end;
//         line-height: 1.3;
//     }

interface LanyardContent {
    name: string;
    largeImage: string;
    largeText: string;
    smallImage?: string;
    smallText?: string;
    firstLine?: string;
    secondLine?: string;
}

const buildAsset = (applicationId: string, assetId: string): string =>
    `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;

const handleGame = (activity: Activity): LanyardContent | null => {
    const { assets } = activity;
    const applicationId = activity.application_id;
    if (!assets || !applicationId) return null;

    let largeImage: string | undefined;
    let smallImage: string | undefined;
    const largeText: string | undefined = assets.large_text;
    const smallText: string | undefined = assets.small_text;

    if (assets.large_image) {
        largeImage = buildAsset(applicationId, assets.large_image);
    }

    if (assets.small_image)
        if (largeImage) {
            smallImage = buildAsset(applicationId, assets.small_image);
        } else {
            largeImage = buildAsset(applicationId, assets.small_image);
        }

    if (!largeImage || !largeText) return null;

    const { name } = activity;
    const firstLine = activity.details;
    const secondLine = activity.state;

    return {
        name,
        largeImage,
        largeText,
        smallImage,
        smallText,
        firstLine,
        secondLine,
    };
};
// const Text = styled.div`
//
//
// `;
