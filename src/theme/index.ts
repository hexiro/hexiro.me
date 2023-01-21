import type { PropertyValue } from "@stitches/react";
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
            "background-tertiary": "#778088",
            // modifiers
            "lighten-10": "rgba(255, 255, 255, 0.1)",
            // alpha
            "background-secondary-alpha-75": "rgba(41, 44, 47, 0.75)",
            "background-secondary-alpha-50": "rgba(41, 44, 47, 0.5)",
            "background-secondary-alpha-25": "rgba(41, 44, 47, 0.25)",
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
            "main-y-padding": "25px",
            "main-x-padding": "min(10%, 150px)",
        },
        fonts: {
            heading: "Plus Jakarta Sans, sans-serif",
            text: "Plus Jakarta Sans, sans-serif",
            // mono: "JetBrains Mono, monospace",
        },
        sizes: {},
        borderWidths: {},
        borderStyles: {},
        radii: {
            sm: "0.125rem",
            base: "0.25rem",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.75rem",
            "xxl": "1rem",
        },
        shadows: {},
        zIndices: {},
        transitions: {
            "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
    media: {
        xxs: "(min-width: 360px)",
        xs: "(min-width: 480px)",
        sm: "(min-width: 640px)",
        md: "(min-width: 768px)",
        lg: "(min-width: 1024px)",
        xl: "(min-width: 1280px)",
        xxl: "(min-width: 1536px)",
    },
    utils: {
        size: (value: PropertyValue<"width">) => ({
            width: value,
            height: value,
        }),
        paddingX: (value: PropertyValue<"paddingLeft">) => ({
            paddingLeft: value,
            paddingRight: value,
        }),
        paddingY: (value: PropertyValue<"paddingTop">) => ({
            paddingTop: value,
            paddingBottom: value,
        }),
        marginX: (value: PropertyValue<"marginLeft">) => ({
            marginLeft: value,
            marginRight: value,
        }),
        marginY: (value: PropertyValue<"marginTop">) => ({
            marginTop: value,
            marginBottom: value,
        }),
    },
    prefix: "hexiro",
});

export const { styled, css, getCssText, config } = stitches;
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
        height: "100%",
        minHeight: "100vh",
        minWidth: "320px",
        overflowX: "hidden",
        color: "$text-primary",
        backgroundColor: "$background-primary",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        textRendering: "optimizeLegibility",
    },
    "input, button, textarea, select, hr": {
        all: "unset",
    },
});
