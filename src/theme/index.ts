import { createStitches } from "@stitches/react";

const stitches = createStitches({
    theme: {
        colors: {
            primary: "rgb(32 33 34)",
            secondary: "rgb(32 33 36)",
            tertiary: "rgba(198, 183, 203, 0.4)",
            "text-primary": "rgb(218, 218, 225)",
            "text-secondary": "rgb(171, 171, 212)",
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
            // text: "Plus Jakarta Sans, sans-serif",
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
        transitions: {},
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
        fontFamily: "$heading",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.5,
        overflowX: "hidden",
        backgroundColor: "$primary",
        minHeight: "100vh",
        height: "100%",
        color: "$text-primary",
    },
    "h1, h2, h3, h4, h5, h6": {
        fontFamily: "$heading",
        color: "$text-primary",
    },
    "input, button, textarea, select": {
        all: "unset",
    },
});
