export const fadeChildren = {
    start: {
        opacity: 1,
    },
    complete: {
        opacity: 1,
        transition: {
            delayChildren: 0.165,
            staggerChildren: 0.1,
        },
    },
};

export const fade = {
    start: {
        opacity: 0,
        y: 15,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    complete: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

export const fadeDown = {
    ...fade,
    start: {
        ...fade.start,
        y: -15,
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
