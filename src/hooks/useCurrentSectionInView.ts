import { selectedRouteIndexAtom } from "@/commons/atoms";
import type { NavSection } from "@/commons/sections";
import { ROUTES } from "@/commons/sections";

import { useAtomValue } from "jotai";

export default function useCurrentSectionInView(): NavSection | null {
    const selectedIndex = useAtomValue(selectedRouteIndexAtom);
    return ROUTES[selectedIndex] ?? null;
}
