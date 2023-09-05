import type { Variants, Transition } from "framer-motion";

// transitions

export const PAGE_TRANSITION: Transition = {
    type: "spring",
    duration: 0.6,
    bounce: 0.15,
};

export type NavigationDirection = "up" | "down" | null;

export const PAGE_TRANSITION_VARIANTS: Variants = {
    hidden: (direction: NavigationDirection) =>
        direction === "up" ? { opacity: 0, x: 0, y: -100 } : { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: (direction: NavigationDirection) =>
        direction === "up" ? { opacity: 0, x: 0, y: 100 } : { opacity: 0, x: 0, y: -100 },
};

// child variants

export const ICON_SWITCH: Variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
};
