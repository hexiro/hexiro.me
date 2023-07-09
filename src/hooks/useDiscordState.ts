import { useEffect } from "react";

import { discordStateAtom } from "@/commons/atoms";
import { DISCORD_SNOWFLAKE, INITIAL_DISCORD_STATE } from "@/commons/config";

import type { DiscordPresenceState } from "@/data/discord";
import { parsePresence } from "@/data/discord";

import { useAtom } from "jotai";
import type { Data as LanyardData } from "use-lanyard";
import { useLanyardWS } from "use-lanyard";

export default function useDiscordState(): DiscordPresenceState {
    const [discordState, setDiscordState] = useAtom(discordStateAtom);

    // @ts-expect-error override initialData type
    const presence = useLanyardWS(DISCORD_SNOWFLAKE, { initialData: null }) as
        | LanyardData
        | undefined
        | null;

    useEffect(() => {
        let parsedPresence: DiscordPresenceState;

        if (presence === null) return;
        if (presence === undefined) parsedPresence = parsePresence(INITIAL_DISCORD_STATE);
        else parsedPresence = parsePresence(presence);

        setDiscordState(parsedPresence);
    }, [presence, setDiscordState]);

    return discordState;
}
