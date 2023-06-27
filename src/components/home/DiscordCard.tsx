import Image from "next/image";
import type { PropsWithChildren } from "react";

import { DISCORD_SNOWFLAKE } from "@/commons/config";

import { Card, SecondaryCard } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";
import { useLanyardWS } from "use-lanyard";
import type { Activity as LanyardActivity, Data as LanyardData, DiscordUser } from "use-lanyard";

const SPECIAL_CHARS = "!@#$%^&?";

export default function DiscordCard({ className }: { className?: string }) {
    const initialData = {
        "spotify": null,
        "listening_to_spotify": false,
        "kv": {},
        "discord_user": {
            "username": "nathlod",
            "public_flags": 4194432,
            "id": DISCORD_SNOWFLAKE,
            "global_name": "nathan",
            "display_name": "nathan",
            "discriminator": "0",
            "bot": false,
            "avatar_decoration": null,
            "avatar": "30a5d8423b9471d72a374883a80089b9",
        },
        "discord_status": "offline",
        "activities": [],
        "active_on_discord_web": false,
        "active_on_discord_mobile": false,
        "active_on_discord_desktop": true,
    } satisfies LanyardData;

    let presence = useLanyardWS(DISCORD_SNOWFLAKE, { initialData });
    if (!presence) presence = initialData;

    const state = parsePresence(presence);

    console.log(state.user);

    return (
        <Card
            className={twMerge(
                "py-6  transition-transform duration-slow ease-in-out hover:perspective-800px hover:rotate-[-1deg] hover:scale-105",
                className
            )}
        >
            <div className="flex flex-col gap-8">
                <div className="flex flex-row">
                    <div className="relative mr-4">
                        <Image
                            className="rounded-full"
                            width={64}
                            height={64}
                            src={state.user.avatar}
                            alt={state.user.alt}
                        />
                        {state.user.status === "online" ? (
                            <StatusIndicator className="bg-green" />
                        ) : (
                            <StatusIndicator className="bg-subtitle">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <span className="w-1/2 h-1/2 rounded-full bg-black/25" />
                                </div>
                            </StatusIndicator>
                        )}
                    </div>
                    <div className="flex flex-col mt-1 leading-extra-tight">
                        <h4 className="text-green text-[28px]">{state.user.displayName}</h4>
                        <h5 className="text-subtitle font-sans font-bold text-[16px]">
                            @{state.user.username}
                        </h5>
                    </div>
                </div>
                <SecondaryCard className="w-[500px]">
                    <div className="flex flex-row">
                        <div className="relative mr-6">
                            {state.ide ? (
                                <Image
                                    priority
                                    className="rounded-md"
                                    width={100}
                                    height={100}
                                    src={state.ide.images.large.src}
                                    alt={state.ide.images.large.alt}
                                />
                            ) : (
                                <div className="flex items-center justify-center w-[100px] h-[100px] bg-background-accent rounded-md">
                                    <h3 className="text-off-white">!#?</h3>
                                </div>
                            )}
                            {}
                        </div>
                        <div className="my-1">
                            <h4 className="text-off-white font-sans font-extrabold text-[24px] mb-2">
                                {state.ide ? state.ide.name : "No IDE active"}
                            </h4>
                            {state.ide ? (
                                state.ide.lines.map((line) => (
                                    <PresenceLine key={line[0].text}>
                                        {line.map((chunk) => (
                                            <span
                                                key={chunk.text}
                                                className={
                                                    chunk.highlighted
                                                        ? "text-green font-bold"
                                                        : "text-[#9E9E9E] font-semibold"
                                                }
                                            >
                                                {chunk.text}
                                            </span>
                                        ))}
                                    </PresenceLine>
                                ))
                            ) : (
                                <PresenceLine>
                                    {[SPECIAL_CHARS, SPECIAL_CHARS, SPECIAL_CHARS].join("-")}
                                </PresenceLine>
                            )}
                        </div>
                    </div>
                </SecondaryCard>
            </div>
        </Card>
    );
}

function StatusIndicator({ className, children }: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={twMerge(
                "absolute bottom-[-1px] right-[-3px] w-6 h-6 rounded-full bg-[#B6B6B6] border-[5px] border-background-secondary",
                className
            )}
        >
            {children}
        </div>
    );
}

function PresenceLine({ className, children }: PropsWithChildren<{ className?: string }>) {
    return (
        <p className={twMerge("text-subtitle font-mono text-[16px] leading-tight", className)}>
            {children}
        </p>
    );
}

interface DiscordPresenceState {
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
    lines: [DiscordPresenceLine] | [DiscordPresenceLine, DiscordPresenceLine];
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

const parsePresence = (data: LanyardData): DiscordPresenceState => {
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
    if (!activity.details) return null;

    const large = parseImage(application_id, assets.large_image, assets.large_text, "large");
    const small = parseImage(application_id, assets.small_image, assets.small_text, "small");

    const lines = [parseLine(activity.details)] as [DiscordPresenceLine];
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

    if (!alt) {
        alt = `${type.charAt(0).toUpperCase()}${type.substring(1)} Rich Presence image`;
    }

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
