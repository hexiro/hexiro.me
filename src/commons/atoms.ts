import type { PageRouteName, SocialRouteName } from "@/commons/routes";

import { atom } from "jotai";

export const menuHoverAtom = atom<PageRouteName | SocialRouteName | null>(null);
export const pageAnimationOverAtom = atom<boolean>(false);
