import Image from "next/image";
import type { PropsWithChildren } from "react";

import { DISCORD_SNOWFLAKE } from "@/commons/config";

import { Card, SecondaryCard } from "@/components/ui/Cards";
import { H3, H4, H5 } from "@/components/ui/Headings";

import { twMerge } from "tailwind-merge";
import { useLanyardWS } from "use-lanyard";
import type { Activity as LanyardActivity, Data as LanyardData, DiscordUser } from "use-lanyard";

const SPECIAL_CHARS = "!@#$%^&?";

export function DiscordCard({ className }: { className?: string }) {
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

    return (
        <Card isHoverable className={className}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-row">
                    <div className="relative mr-4">
                        <Image
                            className="rounded-full"
                            width={64}
                            height={64}
                            src={state.user.avatar}
                            alt={state.user.alt}
                            draggable={false}
                        />
                        {state.user.status === "online" ? (
                            <StatusIndicator className="bg-green" />
                        ) : (
                            <StatusIndicator className="bg-subtitle">
                                <div className="relative flex h-full w-full items-center justify-center">
                                    <span className="h-1/2 w-1/2 rounded-full bg-black/25" />
                                </div>
                            </StatusIndicator>
                        )}
                    </div>
                    <div className="mt-1 flex flex-col leading-extra-tight">
                        <H4 className="text-[28px] text-green">{state.user.displayName}</H4>
                        <H5 className="font-sans text-[16px] font-bold text-subtitle">
                            @{state.user.username}
                        </H5>
                    </div>
                </div>
                <SecondaryCard className="flex w-[500px] flex-row">
                    <div className="relative mr-6 shrink-0">
                        {state.ide ? (
                            <Image
                                priority
                                className="rounded-md "
                                width={100}
                                height={100}
                                src={state.ide.images.large.src}
                                alt={state.ide.images.large.alt}
                                draggable={false}
                            />
                        ) : (
                            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-background-accent">
                                <H3 className="text-off-white">!#?</H3>
                            </div>
                        )}
                    </div>
                    <div className="my-1 w-full overflow-hidden">
                        <H5 className="mb-2 truncate font-sans text-[24px] font-extrabold text-off-white">
                            {state.ide ? state.ide.name : "No IDE active"}
                        </H5>
                        {state.ide ? (
                            state.ide.lines.map((line) => (
                                <PresenceLine key={line[0].text}>
                                    {line.map((chunk) => (
                                        <span
                                            key={chunk.text}
                                            className={
                                                chunk.highlighted
                                                    ? "font-bold text-green"
                                                    : "font-semibold text-[#9E9E9E]"
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
                </SecondaryCard>
            </div>
        </Card>
    );
}

function StatusIndicator({ className, children }: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={twMerge(
                "absolute bottom-[-1px] right-[-3px] h-6 w-6 rounded-full border-[5px] border-background-secondary bg-[#B6B6B6]",
                className
            )}
        >
            {children}
        </div>
    );
}

function PresenceLine({ className, children }: PropsWithChildren<{ className?: string }>) {
    return (
        <p className={twMerge("font-mono text-[16px] leading-tight text-subtitle", className)}>
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
