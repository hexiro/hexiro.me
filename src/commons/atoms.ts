import type { Section, SectionName, SocialName } from "commons/sections";
import { SECTION_NAMES } from "commons/sections";
import { SECTIONS } from "commons/sections";
import { atom } from "jotai";

export const selectedSectionAtom = atom<Section>(SECTIONS[0]);
export const menuHoverAtom = atom<SectionName | SocialName | null>(null);

export const sectionsAnimated = Object.fromEntries(
    SECTION_NAMES.map((sectionName) => [sectionName, atom<boolean>(false)])
) as Record<SectionName, ReturnType<typeof atom<boolean>>>;
