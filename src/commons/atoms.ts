import { atom } from "jotai";

export const selectedRouteIndexAtom = atom<number>(0);
export const menuHoverIndexAtom = atom<number | null>(null);
