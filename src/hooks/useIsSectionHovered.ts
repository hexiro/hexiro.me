import { menuHoverAtom } from "@/commons/atoms";
import type { PageRouteName, SocialRouteName } from "@/commons/routes";

import { useAtomValue } from "jotai";

export default function useIsSectionHovered(name: PageRouteName | SocialRouteName) {
    const hoveredSection = useAtomValue(menuHoverAtom);

    return hoveredSection === name;
}
