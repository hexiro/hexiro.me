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

export const pop = { translateY: -3 };
export const lightPop = { translateY: -2 };
export const tap = { scale: 0.92 };
export const lightTap = { scale: 0.94 };

export const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
};
