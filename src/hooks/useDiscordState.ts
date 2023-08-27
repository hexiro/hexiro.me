import { useEffect, useState } from "react";

import { DISCORD_SNOWFLAKE, INITIAL_DISCORD_STATE } from "@/commons/config";

import type { DiscordPresenceState } from "@/data/discord";
import { parsePresence } from "@/data/discord";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

import type { Data as LanyardData } from "use-lanyard";
import { useLanyardWS } from "use-lanyard";

export default function useDiscordState(): DiscordPresenceState {
    const [discordState, setDiscordState] = useState(parsePresence(INITIAL_DISCORD_STATE));

    // @ts-expect-error override initialData type
    const presence = useLanyardWS(DISCORD_SNOWFLAKE, { initialData: null }) as
        | LanyardData
        | undefined
        | null;

    useIsomorphicLayoutEffect(() => {
        if (typeof window === "undefined") return;

        const stateJson = window.sessionStorage.getItem("discord-state");
        if (stateJson === null) return;

        let parsedPresence: DiscordPresenceState;

        try {
            const state = JSON.parse(stateJson) as LanyardData;
            parsedPresence = parsePresence(state);
        } catch {
            return;
        }

        setDiscordState(parsedPresence);
    }, []);

    useEffect(() => {
        let parsedPresence: DiscordPresenceState;

        if (presence === null) return;
        if (presence === undefined) parsedPresence = parsePresence(INITIAL_DISCORD_STATE);
        else parsedPresence = parsePresence(presence);

        setDiscordState(parsedPresence);
        window.sessionStorage.setItem("discord-state", JSON.stringify(presence));
    }, [presence]);

    return discordState;
}
