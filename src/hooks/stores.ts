import { INITIAL_DISCORD_STATE } from "@/commons/config";

import { parsePresence, type DiscordPresenceState } from "@/data/discord";

import { create } from "zustand";

interface DiscordStateStore {
    state: DiscordPresenceState;
    setState: (state: DiscordPresenceState) => void;
}

export const useDiscordStateStore = create<DiscordStateStore>((set) => ({
    state: parsePresence(INITIAL_DISCORD_STATE),
    setState: (state) => set({ state }),
}));
