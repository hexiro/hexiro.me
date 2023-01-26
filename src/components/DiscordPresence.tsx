import { breakpoints, styled } from "@/theme";

import Image from "next/image";
import { useState } from "react";

import { childStaggerAnimation, extraBounce } from "@/commons/animations";
import { DISCORD } from "@/commons/config";
import useWindowWidthInBounds from "@/hooks/useWindowWidth";

import { Paragraph, Heading } from "components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "react-tippy";
import type { Activity } from "use-lanyard";
import { useLanyardWS } from "use-lanyard";

export default function DiscordPresence() {
    const [visible, setVisible] = useState<boolean>(true);

    const presence = useLanyardWS(DISCORD);
    const state = parseActivities(presence?.activities);

    useWindowWidthInBounds({
        min: breakpoints.xxs,
        handler(state) {
            setVisible(state);
        },
    });

    return (
        <AnimatePresence>
            {visible && state ? (
                <DiscordPresenceContainer
                    variants={childStaggerAnimation}
                    transition={extraBounce}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                >
                    <Images>
                        <Tooltip
                            arrow
                            style={{ display: "block" }}
                            title={state.images.large.tooltip}
                        >
                            <LargeImage
                                width={100}
                                height={100}
                                src={state.images.large.src}
                                alt={state.images.large.tooltip}
                            />
                        </Tooltip>
                        <SmallImageContainer>
                            <Tooltip
                                style={{ display: "block" }}
                                title={state.images.small.tooltip}
                                size="small"
                            >
                                <SmallImage
                                    width={35}
                                    height={35}
                                    src={state.images.small.src}
                                    alt={state.images.small.tooltip}
                                />
                            </Tooltip>
                        </SmallImageContainer>
                    </Images>
                    <Text>
                        <Heading ellipsis as="h4">
                            {state.name}
                        </Heading>
                        <TextBody>
                            {state.lines.map((line, index) => (
                                // usually not ideal to use index as key, but in this case they should remain in the same order
                                // and it'd be too complex to generate a key / parse from the line
                                // eslint-disable-next-line react/no-array-index-key
                                <Paragraph key={index} ellipsis size="sm">
                                    {line.map((chunk) =>
                                        chunk.highlighted ? (
                                            <Highlight key={chunk.text}>{chunk.text}</Highlight>
                                        ) : (
                                            chunk.text
                                        )
                                    )}
                                </Paragraph>
                            ))}
                        </TextBody>
                    </Text>
                </DiscordPresenceContainer>
            ) : null}
        </AnimatePresence>
    );
}

const DiscordPresenceContainer = styled(motion.div, {
    position: "relative",
    aspectRatio: "68 / 23",

    maxWidth: 414,
    height: 140,

    backgroundColor: "$background-secondary",
    borderRadius: "$xl",
    border: "2px solid $lighten-10",
    boxShadow: "$md",
    padding: "$4",
    paddingRight: "$2",
    display: "flex",
    flexDirection: "row",
    willTransition: "transform",

    "@lg": {
        minWidth: "425px",
    },
});

const Highlight = styled("span", {
    color: "$brand-accent",
    fontWeight: 600,
    marginX: 2,
});

const Images = styled("div", {
    position: "relative",
    size: "100px",
});

const LargeImage = styled(Image, {
    border: "2px solid hsl(137deg 20% 41%)",
    borderRadius: "$md",
});

const SmallImageContainer = styled("div", {
    position: "absolute",
    bottom: "-$1",
    right: "-$1",
});

const SmallImage = styled(Image, {
    border: "2px solid rgba(255, 255, 255, 0.75)",
    borderRadius: "50%",
});

const Text = styled("div", {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    paddingLeft: "4%",
    overflow: "hidden",

    "& > img": {
        borderRadius: "$lg",
    },
});

const TextBody = styled("div", {
    paddingY: "$1",
});

interface DiscordPresenceIDEState {
    name: string;
    lines: DiscordPresenceLine[];
    images: {
        large: DiscordPresenceImage;
        small: DiscordPresenceImage;
    };
}

interface DiscordPresenceImage {
    src: string;
    tooltip: string;
}

type DiscordPresenceLine = DiscordPresenceLineChunk[];

interface DiscordPresenceLineChunk {
    text: string;
    highlighted: boolean;
}

const parseActivities = (activities: Activity[] | undefined): DiscordPresenceIDEState | null => {
    if (!activities) return null;

    for (const activity of activities) {
        const parsed = parseActivity(activity);
        if (parsed) return parsed;
    }

    return null;
};

function parseActivity(activity: Activity): DiscordPresenceIDEState | null {
    if (activity.type !== 0) return null;

    const { assets, application_id } = activity;
    if (!assets || !application_id) return null;
    if (!assets.large_image || !assets.large_text || !assets.small_image || !assets.small_text)
        return null;

    const large = parseImage(application_id, assets.large_image, assets.large_text);
    const small = parseImage(application_id, assets.small_image, assets.small_text);

    const lines = [parseLine(activity.state)];
    if (activity.details) lines.unshift(parseLine(activity.details));

    return {
        name: activity.name,
        images: { large, small },
        lines,
    };
}

function parseLine(text: string): DiscordPresenceLine {
    const highlightSplit = text.split("`");
    const chunks: DiscordPresenceLineChunk[] = [];

    for (const [i, chunk] of highlightSplit.entries()) {
        const highlighted = i % 2 === 1;
        chunks.push({ text: chunk, highlighted });
    }

    return chunks;
}

function parseImage(applicationId: string, assetId: string, text: string): DiscordPresenceImage {
    return {
        src: buildAsset(applicationId, assetId),
        tooltip: text,
    };
}

function buildAsset(applicationId: string, assetId: string): string {
    // { application_asset_id } or media proxy urls
    // docs: https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-asset-image

    if (assetId.startsWith("mp:external")) {
        // https://media.discordapp.net/external/ledVVfR9-gwyjYvoVaqZjX0LJmFiM51gyQ3hlIhUyK0/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/tsx.png
        // mp:external/ledVVfR9-gwyjYvoVaqZjX0LJmFiM51gyQ3hlIhUyK0/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/tsx.png
        return assetId.replace("mp:external/", "https://media.discordapp.net/external/");
    }

    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
}
