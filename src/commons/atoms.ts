import { INITIAL_DISCORD_STATE } from "@/commons/config";

import type { DiscordPresenceState } from "@/data/discord";
import { parsePresence } from "@/data/discord";

import { atom } from "jotai";

export const discordStateAtom = atom<DiscordPresenceState>(parsePresence(INITIAL_DISCORD_STATE));
