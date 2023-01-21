import { styled } from "@/theme";

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
                display: "inline-block",
                willChange: "transform",
                transition: "transform 0.2s $ease-in-out",
                "&:hover": {
                    transform: "translateY(-2px)",
                },
            },
        },
    },
});

export default Span;
