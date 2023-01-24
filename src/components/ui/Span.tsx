import { styled } from "@/theme";
import type { CSS } from "@stitches/react";

const animationStyles: CSS = {
    display: "inline-block",
    willChange: "transform",
    willTransition: "transform",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",
};

const pop: CSS = {
    "&:hover": {
        transform: "translateY(-2px)",
    },
};

const tap: CSS = {
    "&:active": {
        transform: "scale(0.96)!important",
    },
};

const Span = styled("span", {
    variants: {
        lineHeight: {
            "single": { lineHeight: 1 },
            "multi": { lineHeight: 1.2 },
        },
        color: {
            "brand-accent": { color: "$brand-accent" },
            "brand-primary": { color: "$brand-primary" },
            "brand-secondary": { color: "$brand-secondary" },
            "text-primary": { color: "$text-primary" },
            "text-secondary": { color: "$text-secondary" },
        },
        animation: {
            pop: {
                ...animationStyles,
                ...pop,
            },
            tap: {
                ...animationStyles,
                ...tap,
            },
            popAndTap: {
                ...animationStyles,
                ...pop,
                ...tap,
            },
        },
    },
});

export default Span;
