import { styled } from "@/theme";

import Image from "next/image";
import { useState } from "react";

import { childStaggerAnimation, extraBounce } from "@/commons/animations";
import { DISCORD } from "@/commons/config";

import { Paragraph, Heading, Tooltip, ImportantContainer } from "components/ui";
import { AnimatePresence } from "framer-motion";
import type {
    Activity as LanyardActivity,
    Data as LanyardData,
    Assets as LanyardAssets,
} from "use-lanyard";
import { useLanyardWS } from "use-lanyard";

export default function DiscordPresence() {
    const [visible, setVisible] = useState<boolean>(true);

    const presence = useLanyardWS(DISCORD, { initialData });
    const state = parseActivities(presence?.activities) ?? parseActivities(initialData.activities);

    const isOnline = presence?.discord_status && presence.discord_status !== "offline";

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
                        <Tooltip title={state.images.large.tooltip}>
                            <LargeImage
                                fill
                                src={state.images.large.src}
                                alt={
                                    state.images.large.tooltip ?? "Discord application large image"
                                }
                            />
                        </Tooltip>
                        <SmallImageContainer>
                            <Tooltip title={state.images.small.tooltip} size="sm">
                                <SmallImage
                                    fill
                                    isOnline={isOnline}
                                    src={state.images.small.src}
                                    alt={
                                        state.images.small.tooltip ??
                                        "Discord application small image"
                                    }
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

const assets = {
    small_text: "Snoozin...",
    small_image:
        "mp:external/Y6xAhARpHfRM8Bkdw0a1ZkbTAIXqKJFmrSAvHjKs6B0/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/idle.png",
    large_image:
        "mp:external/ByjawWsm2QtMAOa2doThD3bIfP42xs9pmNqRE9rs1X4/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/idle-vscode.png",
} as LanyardAssets;

const activity = {
    application_id: "810516608442695700",
    assets,
    buttons: ["View Repository"],
    created_at: 1675121071515,
    details: "Not actively working!",
    flags: 1,
    id: "3c8c68a3ca808bd6",
    name: "Visual Studio Code",
    session_id: "d2466f47875f6a0030d0fbc474ff5905",
    type: 0,
} as unknown as LanyardActivity;

const initialData: LanyardData = {
    spotify: null,
    kv: {},
    listening_to_spotify: false,
    discord_user: {
        username: "hexiro",
        public_flags: 4194432,
        id: "291632819006865408",
        discriminator: "8250",
        bot: false,
        avatar_decoration: null,
        avatar: "6215b611d45fd9c6fe7e8392c8d52c23",
    },
    discord_status: "dnd",
    activities: [activity],
    active_on_discord_web: false,
    active_on_discord_mobile: false,
    active_on_discord_desktop: true,
};
const DiscordPresenceContainer = styled(ImportantContainer, {
    aspectRatio: "55 / 18",
    maxWidth: 440,
    maxHeight: 144,
    size: "100%",
    paddingRight: "$2",
    flexDirection: "row",
    willTransition: "transform",
    padding: "$3",

    "@xs": {
        padding: "$4",
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
    height: "100%",
    aspectRatio: "1 / 1",
});

const LargeImage = styled(Image, {
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "$md",
});

const SmallImageContainer = styled("div", {
    position: "absolute",
    bottom: "-$1",
    right: "-$1",
    size: "33%",
});

const SmallImage = styled(Image, {
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "50%",

    borderColor: "$$borderColor",

    variants: {
        isOnline: {
            true: { $$borderColor: "rgba($colors$brand-primary-rgb, 0.75)" },
            false: { $$borderColor: "rgba(255, 255, 255, 0.2)" },
        },
    },
});

const Text = styled("div", {
    display: "flex",
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
    tooltip?: string;
}

type DiscordPresenceLine = DiscordPresenceLineChunk[];

interface DiscordPresenceLineChunk {
    text: string;
    highlighted: boolean;
}

const parseActivities = (
    activities: LanyardActivity[] | undefined
): DiscordPresenceIDEState | null => {
    if (!activities) return null;

    for (const activity of activities) {
        const parsed = parseActivity(activity);
        if (parsed) return parsed;
    }

    return null;
};

function parseActivity(activity: LanyardActivity): DiscordPresenceIDEState | null {
    if (activity.type !== 0) return null;

    const { assets, application_id } = activity;
    if (!assets || !application_id) return null;
    if (!assets.large_image || !assets.small_image) return null;
    if (!activity.details) return null;

    const large = parseImage(application_id, assets.large_image, assets.large_text);
    const small = parseImage(application_id, assets.small_image, assets.small_text);

    const lines: DiscordPresenceLine[] = [parseLine(activity.details)];
    if (activity.state) lines.push(parseLine(activity.state));

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

function parseImage(
    applicationId: string,
    assetId: string,
    text: string | undefined
): DiscordPresenceImage {
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
