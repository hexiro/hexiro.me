import type { INavRoutePath } from "@/commons/config";
import { INITIAL_DISCORD_STATE, NAV_PATHS } from "@/commons/config";

import { parsePresence, type DiscordPresenceState } from "@/data/discord";

import { create } from "zustand";

interface SelectedRouteStore {
    path: INavRoutePath | null;
    prevRoute: INavRoutePath | undefined;
    nextRoute: INavRoutePath | undefined;
    setSelectedRoute: (index: number) => void;
}

export const useSelectedRouteStore = create<SelectedRouteStore>((set, get) => ({
    path: null,
    prevRoute: undefined,
    nextRoute: NAV_PATHS[1],
    setSelectedRoute(index: number) {
        const path = NAV_PATHS[index];
        const prevRoute = NAV_PATHS[index - 1];
        const nextRoute = NAV_PATHS[index + 1];
        set({ path, prevRoute, nextRoute });
    },
}));

interface RouteAnimationStore {
    newRoute: string | null;
    oldRoute: string | null;
    set: (newRoute: string | null, oldRoute: string | null) => void;
    navigationDirection: "up" | "down" | null;
}

export const useRouteAnimationStore = create<RouteAnimationStore>((set) => ({
    newRoute: null,
    oldRoute: null,
    navigationDirection: null,
    set(newRoute, oldRoute) {
        const newRouteIndex = newRoute ? NAV_PATHS.findIndex((path) => path === newRoute) : -1;
        const oldRouteIndex = oldRoute ? NAV_PATHS.findIndex((path) => path === oldRoute) : -1;
        const navigationDirection = newRouteIndex >= oldRouteIndex ? "down" : "up";
        set({ newRoute, oldRoute, navigationDirection });
    },
}));

interface DiscordStateStore {
    state: DiscordPresenceState;
    setState: (state: DiscordPresenceState) => void;
}

export const useDiscordStateStore = create<DiscordStateStore>((set) => ({
    state: parsePresence(INITIAL_DISCORD_STATE),
    setState: (state) => set({ state }),
}));
