import { menuHoverAtom } from "@/commons/atoms";
import type { SectionName, SocialName } from "@/commons/sections";

import { useAtomValue } from "jotai";

export default function useIsSectionHovered(name: SectionName | SocialName) {
    const hoveredSection = useAtomValue(menuHoverAtom);

    return hoveredSection === name;
}
