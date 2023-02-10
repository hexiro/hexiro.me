import { selectedRouteIndexAtom } from "@/commons/atoms";
import type { RouteName } from "@/commons/sections";
import { ROUTE_NAMES } from "@/commons/sections";

import { useAtom } from "jotai";

export default function useIsSectionCurrentSectionInView(routeName: RouteName) {
    const [selectedIndex] = useAtom(selectedRouteIndexAtom);

    const index = ROUTE_NAMES.findIndex((name) => name === routeName);

    return index === selectedIndex;
}
