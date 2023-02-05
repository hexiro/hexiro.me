import type { RefObject } from "react";

import { selectedRouteIndexAtom } from "@/commons/atoms";
import { useInViewOptions } from "@/commons/framer";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

import { useInView } from "framer-motion";
import { useAtom } from "jotai";

interface UseUpdateNavStateOptions {
    homeRef: RefObject<HTMLElement>;
    projectsRef: RefObject<HTMLElement>;
}

export default function useUpdateNavState({ homeRef, projectsRef }: UseUpdateNavStateOptions) {
    const homeInView = useInView(homeRef, useInViewOptions);
    const projectsInView = useInView(projectsRef, useInViewOptions);

    const [, setSelectedRouteIndex] = useAtom(selectedRouteIndexAtom);

    useIsomorphicLayoutEffect(() => {
        const inViews = [homeInView, projectsInView];

        for (let i = inViews.length - 1; i >= 0; i--) {
            if (inViews[i]) {
                setSelectedRouteIndex(i);
                break;
            }
        }
    }, [homeInView, projectsInView]);
}
