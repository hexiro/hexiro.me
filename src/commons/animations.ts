export const fadeParent = {
    start: {
        opacity: 1,
    },
    fade: {
        opacity: 1,
        transition: {
            delayChildren: 0.165,
            staggerChildren: 0.1,
        },
    },
};

export const fadeChild = {
    start: {
        opacity: 0,
        y: 15,
        transition: {
            duration: 0.35,
            ease: "easeInOut",
        },
    },
    fade: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: "easeInOut",
        },
    },
};

export const pop = {
    pop: { translateY: -3 },
    lightPop: { translateY: -2 },
};

export const tap = {
    tap: { scale: 0.92 },
    lightTap: { scale: 0.94 },
};
