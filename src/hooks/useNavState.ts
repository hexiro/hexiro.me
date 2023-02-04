import { useRouter } from "next/router";

import { selectedRouteIndexAtom } from "@/commons/atoms";

import { useAtom } from "jotai";

export default function useNavState() {
    const [selectedIndex] = useAtom(selectedRouteIndexAtom);
    const router = useRouter();

    const isHome = router.pathname === "/";

    return { isHome, selectedIndex };
}
