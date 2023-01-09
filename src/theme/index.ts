import { createStitches } from "@stitches/react";

const stitches = createStitches({
    theme: {
        colors: {
            // brand colors
            "brand-primary": "#4BFF9F",
            "brand-accent": "#E7FFF2",
            // text colors
            "text-primary": "#D2E0D5",
            "text-secondary": "#B7BEB9",
            // background colors
            "background-primary": "#191C1D",
            "background-secondary": "#292C2F",
            "background-tertiary": "rgba(232, 255, 232, 0.2)",
            // modifiers
            "lighten-10": "rgba(255, 255, 255, 0.1)",
            "lighten-20": "rgba(255, 255, 255, 0.2)",
        },
        space: {
            1: "5px",
            2: "10px",
            3: "15px",
            4: "20px",
            5: "25px",
            6: "35px",
            7: "45px",
            8: "65px",
            9: "80px",
        },
        fonts: {
            heading: "Plus Jakarta Sans, sans-serif",
            text: "Plus Jakarta Sans, sans-serif",
            // mono: "JetBrains Mono, monospace",
        },
        media: {
            sm: "(min-width: 30em)",
            md: "(min-width: 48em)",
            lg: "(min-width: 62em)",
            xl: "(min-width: 80em)",
            "2xl": "(min-width: 96em)",
        },
        fontWeights: {},
        lineHeights: {},
        letterSpacings: {},
        sizes: {},
        borderWidths: {},
        borderStyles: {},
        radii: {
            sm: "0.125rem",
            base: "0.25rem",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.75rem",
            "2xl": "1rem",
            "3xl": "1.5rem",
        },
        shadows: {},
        zIndices: {},
        transitions: {
            "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
});

export const { styled, css, getCssText } = stitches;
const { globalCss } = stitches;

export const globalStyles = globalCss({
    "*, *:before, *:after": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
    },
    html: {
        scrollBehavior: "smooth",
    },
    body: {
        fontFamily: "$text",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.2,
        minHeight: "100vh",
        height: "100%",
        overflowX: "hidden",
        color: "$text-primary",
        backgroundColor: "$background-primary",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        textRendering: "optimizeLegibility",
    },
    "input, button, textarea, select": {
        all: "unset",
    },
});
