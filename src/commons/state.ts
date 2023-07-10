import type { INavRoutePath } from "@/commons/config";
import { INITIAL_DISCORD_STATE, NAV_PATHS } from "@/commons/config";

import type { DiscordPresenceState } from "@/data/discord";
import { parsePresence } from "@/data/discord";

import { atom } from "jotai";
import { create } from "zustand";

export const discordStateAtom = atom<DiscordPresenceState>(parsePresence(INITIAL_DISCORD_STATE));

interface SelectedRouteStore {
    index: number;
    path: INavRoutePath;
    prevRoute: INavRoutePath | undefined;
    nextRoute: INavRoutePath | undefined;
    setIndex: (index: number) => void;
}

export const useSelectedRouteStore = create<SelectedRouteStore>((set, get) => ({
    index: 0,
    path: NAV_PATHS[0],
    prevRoute: undefined,
    nextRoute: NAV_PATHS[1],
    setIndex(index: number) {
        const path = NAV_PATHS[index];
        const prevRoute = NAV_PATHS[index - 1];
        const nextRoute = NAV_PATHS[index + 1];
        set({ index, path, prevRoute, nextRoute });
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
        const oldRouteIndex = oldRoute ? NAV_PATHS.findIndex((path) => path === oldRoute) : -1;
        const newRouteIndex = newRoute ? NAV_PATHS.findIndex((path) => path === newRoute) : -1;
        const navigationDirection = newRouteIndex >= oldRouteIndex ? "down" : "up";
        set({ newRoute, oldRoute, navigationDirection });
    },
}));

export type NavDirection = "vertical" | "horizontal";
interface NavState {
    direction: NavDirection;
    scrollable: boolean;
    set: (direction: NavDirection, scrollable: boolean) => void;
}

export const useNavStateStore = create<NavState>((set) => ({
    direction: "vertical",
    scrollable: false,
    set: (direction, scrollable) => set({ direction, scrollable }),
}));
