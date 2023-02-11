import type { RouteName, SocialsName } from "commons/sections";
import { atom } from "jotai";

export const selectedRouteIndexAtom = atom<number>(0);
export const menuHoverIndexAtom = atom<RouteName | SocialsName | null>(null);
