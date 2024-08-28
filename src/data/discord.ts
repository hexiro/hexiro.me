import { DISCORD_SNOWFLAKE } from "@/commons/config";

import type { Data as LanyardData, Activity as LanyardActivity, DiscordUser } from "use-lanyard";

export interface DiscordPresenceState {
    user: DiscordUserState;
    ide: DiscordPresenceIDEState | null;
}

type DiscordUserStatus = "online" | "offline";

interface DiscordUserState {
    displayName: string;
    username: string;
    avatar: string;
    alt: string;
    status: DiscordUserStatus;
}

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
    alt: string;
}

type DiscordPresenceLine = DiscordPresenceLineChunk[];

interface DiscordPresenceLineChunk {
    text: string;
    highlighted: boolean;
}

export const parsePresence = (data: LanyardData): DiscordPresenceState => {
    const userState = parseDiscordUser(data.discord_user, data.discord_status);
    let ideState: DiscordPresenceIDEState | null = null;

    for (const activity of data.activities) {
        ideState = parseActivity(activity);
        if (ideState) break;
    }

    return {
        user: userState,
        ide: ideState,
    };
};

function parseDiscordUser(
    user: DiscordUser,
    status: LanyardData["discord_status"]
): DiscordUserState {
    const avatar = parseAvatar(user, 80);

    if (status === "dnd") status = "online";
    if (status === "idle") status = "offline";

    return {
        displayName: user.global_name ?? user.username,
        username: user.username,
        status,
        avatar: avatar.src,
        alt: avatar.alt,
    };
}

function parseAvatar(discordUser: DiscordUser, size: number): DiscordPresenceImage {
    size = Math.round(size);
    let src: string;
    let alt: string;

    if (discordUser.avatar) {
        src = `https://cdn.discordapp.com/avatars/${DISCORD_SNOWFLAKE}/${discordUser.avatar}.webp?size=${size}`;
        alt = `${discordUser.username}'s Discord Avatar`;
    } else {
        let avatarNum: number;
        if (discordUser.discriminator !== "0") {
            avatarNum = Number(discordUser.discriminator) % 5;
        } else {
            avatarNum = 1;
        }

        src = `https://cdn.discordapp.com/embed/avatars/${avatarNum}.png?size=${size}`;
        alt = `Default Discord Avatar #${avatarNum}`;
    }

    return { src, alt };
}

function parseActivity(activity: LanyardActivity): DiscordPresenceIDEState | null {
    if (activity.type !== 0) return null;

    const { assets, application_id } = activity;
    if (!assets || !application_id) return null;
    if (!assets.large_image || !assets.small_image) return null;
    if (!activity.details && !activity.state) return null;

    const large = parseImage(application_id, assets.large_image, assets.large_text, "large");
    const small = parseImage(application_id, assets.small_image, assets.small_text, "small");

    const lines: DiscordPresenceLine[] = [];
    if (activity.details) lines.push(parseLine(activity.details));
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
    text: string | undefined,
    type: "large" | "small"
): DiscordPresenceImage {
    let alt = text;

    alt ||= `${type.charAt(0).toUpperCase()}${type.substring(1)} Rich Presence image`;

    return {
        src: buildAsset(applicationId, assetId),
        alt,
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
