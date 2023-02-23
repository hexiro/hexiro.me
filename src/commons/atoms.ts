import type { PageRoute, PageRouteName, SocialRouteName } from "@/commons/routes";
import { PAGE_ROUTE_NAMES } from "@/commons/routes";
import { PAGE_ROUTES } from "@/commons/routes";
import { atom } from "jotai";

export const selectedSectionAtom = atom<PageRoute>(PAGE_ROUTES[0]);
export const menuHoverAtom = atom<PageRouteName | SocialRouteName | null>(null);

export const sectionsAnimated = Object.fromEntries(
    PAGE_ROUTE_NAMES.map((sectionName) => [sectionName, atom<boolean>(false)])
) as Record<PageRouteName, ReturnType<typeof atom<boolean>>>;
