import { useMemo } from "react";

import { menuHoverIndexAtom } from "@/commons/atoms";
import type { RouteName, SocialsName } from "@/commons/sections";

import { useAtomValue } from "jotai";

export default function useIsSectionHovered(name: RouteName | SocialsName) {
    const hoveredSection = useAtomValue(menuHoverIndexAtom);
    const isHovered = useMemo(() => hoveredSection === name, [hoveredSection, name]);

    return isHovered;
}
