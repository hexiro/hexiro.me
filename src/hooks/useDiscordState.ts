import { useEffect } from "react";

import { DISCORD_SNOWFLAKE, INITIAL_DISCORD_STATE } from "@/commons/config";

import type { DiscordPresenceState } from "@/data/discord";
import { parsePresence } from "@/data/discord";

import { useDiscordStateStore } from "@/hooks/stores";

import type { Data as LanyardData } from "use-lanyard";
import { useLanyardWS } from "use-lanyard";
import { shallow } from "zustand/shallow";

export default function useDiscordState(): DiscordPresenceState {
    const { state, setState } = useDiscordStateStore(
        ({ state, setState }) => ({
            state,
            setState,
        }),
        shallow
    );

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

        setState(parsedPresence);
    }, [presence, setState]);

    return state;
}
