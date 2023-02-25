import type { PageRouteType } from "@/commons/routes";
import { PAGE_ROUTES } from "@/commons/routes";

import usePageRouteIndex from "hooks/usePageRouteIndex";

export default function usePageRoute() {
    const pageRouteIndex = usePageRouteIndex();
    const pageRoute = PAGE_ROUTES[pageRouteIndex] as PageRouteType | undefined;
    return pageRoute;
}
