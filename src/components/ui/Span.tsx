import { styled } from "@/theme";

import { animationStylesWithDisplay, pop, tap } from "@/commons/animations";

const Span = styled("span", {
    variants: {
        lineHeight: {
            "single": { lineHeight: 1 },
            "multi": { lineHeight: 1.2 },
        },
        color: {
            "brand-accent": { color: "$brand-accent" },
            "brand-primary": { color: "$brand-primary" },
            "text-primary": { color: "$text-primary" },
            "text-secondary": { color: "$text-secondary" },
        },
        animation: {
            pop: {
                ...animationStylesWithDisplay,
                ...pop,
            },
            tap: {
                ...animationStylesWithDisplay,
                ...tap,
            },
            popAndTap: {
                ...animationStylesWithDisplay,
                ...pop,
                ...tap,
            },
        },
    },
});

export default Span;
