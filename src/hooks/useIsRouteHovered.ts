import { hoveredRouteAtom } from "@/commons/atoms";
import type { PageRouteName, SocialRouteName } from "@/commons/routes";

import { useAtomValue } from "jotai";

export default function useIsRouteHovered(name: PageRouteName | SocialRouteName) {
    const hoveredRoute = useAtomValue(hoveredRouteAtom);
    return hoveredRoute === name;
}
