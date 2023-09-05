import { useMemo } from "react";

import { NAV_PATHS } from "@/commons/config";

import usePathname from "@/hooks/usePathname";

export default function useSelectedRouteIndex() {
    const pathname = usePathname();
    const selectedIndex = useMemo(
        () => NAV_PATHS.findIndex((path) => path === pathname),
        [pathname]
    );

    return selectedIndex;
}
