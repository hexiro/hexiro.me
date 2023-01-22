import { css, styled } from "@/theme";

const animationStyles = css({
    display: "inline-block",
    willChange: "transform",
    willTransition: "transform",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",
});

const pop = css({
    "&:hover": {
        transform: "translateY(-2px)",
    },
});

const tap = css({
    "&:active": {
        transform: "scale(0.96)!important",
    },
});

const Span = styled("span", {
    lineHeight: 1,
    variants: {
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
