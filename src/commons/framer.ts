import type { Variants, Transition, useInView } from "framer-motion";

export const useInViewOptions: NonNullable<Parameters<typeof useInView>[1]> = {
    amount: 0.35,
};

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

export const staggerAnimation: Variants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.07 } },
};

export const childStaggerAnimation: Variants = {
    initial: {
        y: 20,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
    },
};
