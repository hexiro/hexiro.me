import type { CSS } from "@/theme";

import type { Variants, Transition, useInView } from "framer-motion";

export const useInViewOptions: NonNullable<Parameters<typeof useInView>[1]> = {
    amount: 0.35,
};

// transitions
export const smallBounce: Transition = {
    type: "spring",
    duration: 0.4,
    bounce: 0.15,
};

export const normalBounce: Transition = {
    type: "spring",
    duration: 0.4,
    bounce: 0.25,
};

export const extraBounce: Transition = {
    type: "spring",
    damping: 15,
    stiffness: 200,
};

// variants

// parent variants

export const staggerChildren: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.07,
        },
    },
};

export const extendedStaggerChildren: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            delayChildren: 0.05,
            staggerChildren: 0.14,
        },
    },
};

// child variants

export const fadeInAndScale: Variants = {
    initial: {
        scale: 0.8,
        opacity: 0,
    },
    animate: {
        scale: 1,
        opacity: 1,
    },
};

export const fadeIn: Variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

export const slideFromLeft: Variants = {
    initial: {
        x: -32,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: extraBounce,
    },
};

export const slideFromBottom: Variants = {
    initial: {
        y: 20,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: extraBounce,
    },
};

export const animationStyles: CSS = {
    willChange: "transform",
    willTransition: "transform",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",
};

export const animationStylesWithDisplay: CSS = {
    display: "inline-block",
    ...animationStyles,
};

export const pop: CSS = {
    "&:hover": {
        transform: "translateY(-2px)",
    },
};

export const tap: CSS = {
    "&:active": {
        transform: "scale(0.96)!important",
    },
};
