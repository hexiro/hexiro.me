import { theme } from "@/theme";

import type { RefObject } from "react";

import { selectedSectionAtom } from "@/commons/atoms";
import { PAGE_ROUTES } from "@/commons/routes";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

import { useSetAtom } from "jotai";

export default function useUpdateNavState(...refs: Array<RefObject<HTMLElement>>) {
    const setSelectedSection = useSetAtom(selectedSectionAtom);

    useIsomorphicLayoutEffect(() => {
        if (!refs.every((ref) => ref.current !== null)) return;
        if (typeof window === "undefined") return;

        const handler = () => {
            let highestPercentage = 0;
            let index = -1;

            for (const [refIndex, ref] of refs.entries()) {
                const percentage = getViewPercentage(ref.current!);

                if (percentage > highestPercentage) {
                    highestPercentage = percentage;
                    index = refIndex;
                }
            }

            const section = PAGE_ROUTES[index] ?? null;
            setSelectedSection(section);
        };

        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, [refs]);
}

/**
 * @reference https://gist.githubusercontent.com/rijkvanzanten/df73ae28e80b9c6e5030baed4d1a90a6/raw/6669db80891150aeea1f0ca07ca4c15171c1e70e/percentage-in-view.js
 */
function getViewPercentage(element: HTMLElement) {
    const navHeight = Number.parseInt(theme.sizes["nav-height"].value, 10);

    const viewport = {
        top: window.pageYOffset + navHeight,
        bottom: window.pageYOffset + window.innerHeight,
    };

    const elementBoundingRect = element.getBoundingClientRect();
    const elementPos = {
        top: elementBoundingRect.y + window.pageYOffset + navHeight,
        bottom: elementBoundingRect.y + elementBoundingRect.height + window.pageYOffset,
    };

    if (viewport.top > elementPos.bottom || viewport.bottom < elementPos.top) {
        return 0;
    }

    // Element is fully within viewport
    if (viewport.top < elementPos.top && viewport.bottom > elementPos.bottom) {
        return 100;
    }

    // Element is bigger than the viewport
    if (elementPos.top < viewport.top && elementPos.bottom > viewport.bottom) {
        return 100;
    }

    const elementHeight = elementBoundingRect.height;
    let elementHeightInView = elementHeight;

    if (elementPos.top < viewport.top) {
        elementHeightInView = elementHeight - (window.pageYOffset - elementPos.top);
    }

    if (elementPos.bottom > viewport.bottom) {
        elementHeightInView -= elementPos.bottom - viewport.bottom;
    }

    const percentageInView = (elementHeightInView / window.innerHeight) * 100;

    return Math.round(percentageInView);
}
