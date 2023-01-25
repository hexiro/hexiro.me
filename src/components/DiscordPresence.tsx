import { DISCORD } from "@/commons/config";

import type { Activity } from "use-lanyard";
import { useLanyardWS } from "use-lanyard";

export default function DiscordPresence() {
    const presence = useLanyardWS(DISCORD);
    const state = parseActivities(presence?.activities);

    // console.log({ state });

    return <></>;
}

interface DiscordPresenceIDEState {
    name: string;
    lines: string[];
    images: {
        large: DiscordPresenceImageState;
        small: DiscordPresenceImageState;
    };
}

interface DiscordPresenceImageState {
    src: string;
    tooltip: string;
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

    const lines = [activity.state];
    if (activity.details) lines.unshift(activity.details);

    const large: DiscordPresenceImageState = {
        src: buildAsset(application_id, assets.large_image),
        tooltip: assets.large_text,
    };

    const small: DiscordPresenceImageState = {
        src: buildAsset(application_id, assets.small_image),
        tooltip: assets.small_text,
    };

    return {
        name: activity.name,
        lines,
        images: { large, small },
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
