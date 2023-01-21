import type { Variants, Transition } from "framer-motion";

export const pop = { translateY: -2 };
export const lightPop = { translateY: -1 };

export const normalBounce: Transition = {
    type: "spring",
    duration: 0.4,
    bounce: 0.25,
};

export const smallBounce: Transition = {
    type: "spring",
    duration: 0.4,
    bounce: 0.15,
};

export const fadeInAndScale: Variants = {
    animate: {
        scale: 1,
        opacity: 1,
    },
    initial: {
        scale: 0.8,
        opacity: 0,
    },
};

export const fadeIn: Variants = {
    animate: {
        opacity: 1,
    },
    initial: {
        opacity: 0,
    },
};
