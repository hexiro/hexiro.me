import { atom } from "jotai";

export const isMenuOpenAtom = atom<boolean>(false);
export const menuHoverIndexAtom = atom<number | null>(null);
