import type { PropertyValue } from "@stitches/react";
import { createStitches, defaultThemeMap } from "@stitches/react";

const media = {
    xxs: "(min-width: 360px)",
    xs: "(min-width: 480px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    xxl: "(min-width: 1536px)",
};

export const breakpoints = Object.fromEntries(
    Object.entries(media).map(([key, value]) => [key, Number(value.replace(/\D/g, ""))])
) as Record<keyof typeof media, number>;

const stitches = createStitches({
    prefix: "hexiro",
    theme: {
        colors: {
            // brand colors
            "brand-primary-rgb": "75, 255, 159",
            "brand-primary": "rgb($brand-primary-rgb)",
            "brand-accent": "#E7FFF2",
            "brand-tertiary": "rgba(232, 255, 232, 0.2)",
            // text colors
            "text-primary": "#D2E0D5",
            "text-secondary": "#B7BEB9",
            // background colors
            "background-primary": "#191C1D",
            "background-secondary-rgb": "41, 44, 47",
            "background-secondary": "rgb($background-secondary-rgb)",
            "background-tertiary": "#778088",
            "background-blended": "#212426",
            // modifiers
            "lighten-5": "rgba(255, 255, 255, 0.05)",
            "lighten-10": "rgba(255, 255, 255, 0.1)",
            // alpha
            "brand-primary-alpha-75": "rgba($brand-primary-rgb, 0.75)",
            "brand-primary-alpha-50": "rgba($brand-primary-rgb, 0.5)",
            "brand-primary-alpha-25": "rgba($brand-primary-rgb, 0.25)",
            "background-secondary-alpha-75": "rgba($background-secondary-rgb, 0.75)",
            "background-secondary-alpha-50": "rgba($background-secondary-rgb, 0.5)",
            "background-secondary-alpha-25": "rgba($background-secondary-rgb, 0.25)",
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
        sizes: {
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
        radii: {
            sm: "0.125rem",
            base: "0.25rem",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.75rem",
            "xxl": "1rem",
            "max": "9999px",
        },
        lineHeights: {
            "single": 1,
            "multi": 1.2,
        },
        shadows: {
            "xs": "0 0 0 1px rgba(0, 0, 0, 0.05)",
            "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            "base": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        zIndices: {
            "base": 0,
            "above": 1,
            "max": 9999,
        },
        transitionDurations: {
            "fast": "0.2s",
            "normal": "0.45s",
        },
        transitionTimingFunctions: {
            "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
    media,
    utils: {
        willTransition: (value: PropertyValue<"willChange">) => ({
            willChange: value,
            transitionProperty: value,
        }),
        size: (value: PropertyValue<"width">) => ({
            width: value,
            height: value,
        }),
        maxSize: (value: PropertyValue<"maxWidth">) => ({
            maxWidth: value,
            maxHeight: value,
        }),
        minSize: (value: PropertyValue<"minWidth">) => ({
            minWidth: value,
            minHeight: value,
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
    themeMap: {
        ...defaultThemeMap,
        transitionDuration: "transitionDurations",
        transitionTimingFunction: "transitionTimingFunctions",
    },
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
    "li": {
        listStyle: "none",
    },
});

export const tippyStyles = globalCss({
    ".tippy-touch": {
        cursor: "pointer !important",
    },
    ".tippy-notransition": {
        "transition": "none !important",
    },
    ".tippy-popper": {
        maxWidth: 400,
        perspective: 800,
        zIndex: "$max",
        outline: 0,
        transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
        pointerEvents: "none",
    },
    ".tippy-popper.html-template": {
        // maxWidth: "96%",
        maxWidth: "calc(100% - 20px)",
    },
    ".tippy-popper[x-placement^=top] [x-arrow]": {
        borderTop: "7px solid #333",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
        bottom: "-7px",
        margin: "0 9px",
    },
    ".tippy-popper[x-placement^=top] [x-arrow].arrow-small": {
        borderTop: "5px solid #333",
        borderRight: "5px solid transparent",
        borderLeft: "5px solid transparent",
        bottom: "-5px",
    },
    ".tippy-popper[x-placement^=top] [x-arrow].arrow-big": {
        borderTop: "10px solid #333",
        borderRight: "10px solid transparent",
        borderLeft: "10px solid transparent",
        bottom: "-10px",
    },
    ".tippy-popper[x-placement^=top] [x-circle]": {
        transformOrigin: "0 33%",
    },
    ".tippy-popper[x-placement^=top] [x-circle].enter": {
        transform: "scale(1) translate(-50%, -55%)",
        opacity: 1,
    },
    ".tippy-popper[x-placement^=top] [x-circle].leave": {
        transform: "scale(0.15) translate(-50%, -50%)",
        opacity: 0,
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-circle]": {
        backgroundColor: "#fff",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow]": {
        borderTop: "7px solid #fff",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow].arrow-small": {
        borderTop: "5px solid #fff",
        borderRight: "5px solid transparent",
        borderLeft: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.light-theme [x-arrow].arrow-big": {
        borderTop: "10px solid #fff",
        borderRight: "10px solid transparent",
        borderLeft: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-circle]": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow]": {
        borderTop: "7px solid rgba(0, 0, 0, 0.7)",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow].arrow-small": {
        borderTop: "5px solid rgba(0, 0, 0, 0.7)",
        borderRight: "5px solid transparent",
        borderLeft: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=top] .tippy-tooltip.transparent-theme [x-arrow].arrow-big": {
        borderTop: "10px solid rgba(0, 0, 0, 0.7)",
        borderRight: "10px solid transparent",
        borderLeft: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=top] [data-animation=perspective]": {
        transformOrigin: "bottom",
    },
    ".tippy-popper[x-placement^=top] [data-animation=perspective].enter": {
        opacity: 1,
        transform: "translateY(-10px) rotateX(0)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=perspective].leave": {
        opacity: 0,
        transform: "translateY(0) rotateX(90deg)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=fade].enter": {
        opacity: 1,
        transform: "translateY(-10px)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=fade].leave": {
        opacity: 0,
        transform: "translateY(-10px)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=shift].enter": {
        opacity: 1,
        transform: "translateY(-10px)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=shift].leave": {
        opacity: 0,
        transform: "translateY(0)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=scale].enter": {
        opacity: 1,
        transform: "translateY(-10px) scale(1)",
    },
    ".tippy-popper[x-placement^=top] [data-animation=scale].leave": {
        opacity: 0,
        transform: "translateY(0) scale(0)",
    },
    ".tippy-popper[x-placement^=bottom] [x-arrow]": {
        borderBottom: "7px solid #333",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
        top: "-7px",
        margin: "0 9px",
    },
    ".tippy-popper[x-placement^=bottom] [x-arrow].arrow-small": {
        borderBottom: "5px solid #333",
        borderRight: "5px solid transparent",
        borderLeft: "5px solid transparent",
        top: "-5px",
    },
    ".tippy-popper[x-placement^=bottom] [x-arrow].arrow-big": {
        borderBottom: "10px solid #333",
        borderRight: "10px solid transparent",
        borderLeft: "10px solid transparent",
        top: "-10px",
    },
    ".tippy-popper[x-placement^=bottom] [x-circle]": {
        transformOrigin: "0 -50%",
    },
    ".tippy-popper[x-placement^=bottom] [x-circle].enter": {
        transform: "scale(1) translate(-50%, -45%)",
        opacity: 1,
    },
    ".tippy-popper[x-placement^=bottom] [x-circle].leave": {
        transform: "scale(0.15) translate(-50%, -5%)",
        opacity: 0,
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-circle]": {
        backgroundColor: "#fff",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow]": {
        borderBottom: "7px solid #fff",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow].arrow-small": {
        borderBottom: "5px solid #fff",
        borderRight: "5px solid transparent",
        borderLeft: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.light-theme [x-arrow].arrow-big": {
        borderBottom: "10px solid #fff",
        borderRight: "10px solid transparent",
        borderLeft: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-circle]": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow]": {
        borderBottom: "7px solid rgba(0, 0, 0, 0.7)",
        borderRight: "7px solid transparent",
        borderLeft: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow].arrow-small": {
        borderBottom: "5px solid rgba(0, 0, 0, 0.7)",
        borderRight: "5px solid transparent",
        borderLeft: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=bottom] .tippy-tooltip.transparent-theme [x-arrow].arrow-big": {
        borderBottom: "10px solid rgba(0, 0, 0, 0.7)",
        borderRight: "10px solid transparent",
        borderLeft: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=perspective]": {
        transformOrigin: "top",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=perspective].enter": {
        opacity: 1,
        transform: "translateY(10px) rotateX(0)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=perspective].leave": {
        opacity: 0,
        transform: "translateY(0) rotateX(-90deg)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=fade].enter": {
        opacity: 1,
        transform: "translateY(10px)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=fade].leave": {
        opacity: 0,
        transform: "translateY(10px)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=shift].enter": {
        opacity: 1,
        transform: "translateY(10px)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=shift].leave": {
        opacity: 0,
        transform: "translateY(0)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=scale].enter": {
        opacity: 1,
        transform: "translateY(10px) scale(1)",
    },
    ".tippy-popper[x-placement^=bottom] [data-animation=scale].leave": {
        opacity: 0,
        transform: "translateY(0) scale(0)",
    },
    ".tippy-popper[x-placement^=left] [x-arrow]": {
        borderLeft: "7px solid #333",
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        right: "-7px",
        margin: "6px 0",
    },
    ".tippy-popper[x-placement^=left] [x-arrow].arrow-small": {
        borderLeft: "5px solid #333",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        right: "-5px",
    },
    ".tippy-popper[x-placement^=left] [x-arrow].arrow-big": {
        borderLeft: "10px solid #333",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        right: "-10px",
    },
    ".tippy-popper[x-placement^=left] [x-circle]": {
        transformOrigin: "50% 0",
    },
    ".tippy-popper[x-placement^=left] [x-circle].enter": {
        transform: "scale(1) translate(-50%, -50%)",
        opacity: "1",
    },
    ".tippy-popper[x-placement^=left] [x-circle].leave": {
        transform: "scale(0.15) translate(-50%, -50%)",
        opacity: 0,
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-circle]": {
        backgroundColor: "#fff",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow]": {
        borderLeft: "7px solid #fff",
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow].arrow-small": {
        borderLeft: "5px solid #fff",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.light-theme [x-arrow].arrow-big": {
        borderLeft: "10px solid #fff",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-circle]": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow]": {
        borderLeft: "7px solid rgba(0, 0, 0, 0.7)",
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow].arrow-small": {
        borderLeft: "5px solid rgba(0, 0, 0, 0.7)",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=left] .tippy-tooltip.transparent-theme [x-arrow].arrow-big": {
        borderLeft: "10px solid rgba(0, 0, 0, 0.7)",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=left] [data-animation=perspective]": {
        transformOrigin: "right",
    },
    ".tippy-popper[x-placement^=left] [data-animation=perspective].enter": {
        opacity: 1,
        transform: "translateX(-10px) rotateY(0)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=perspective].leave": {
        opacity: 0,
        transform: "translateX(0) rotateY(-90deg)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=fade].enter": {
        opacity: 1,
        transform: "translateX(-10px)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=fade].leave": {
        opacity: 0,
        transform: "translateX(-10px)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=shift].enter": {
        opacity: 1,
        transform: "translateX(-10px)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=shift].leave": {
        opacity: 0,
        transform: "translateX(0)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=scale].enter": {
        opacity: 1,
        transform: "translateX(-10px) scale(1)",
    },
    ".tippy-popper[x-placement^=left] [data-animation=scale].leave": {
        opacity: 0,
        transform: "translateX(0) scale(0)",
    },
    ".tippy-popper[x-placement^=right] [x-arrow]": {
        borderRight: "7px solid #333",
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        left: "-7px",
        margin: "6px 0",
    },
    ".tippy-popper[x-placement^=right] [x-arrow].arrow-small": {
        borderRight: "5px solid #333",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
        left: "-5px",
    },
    ".tippy-popper[x-placement^=right] [x-arrow].arrow-big": {
        borderRight: "10px solid #333",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        left: "-10px",
    },
    ".tippy-popper[x-placement^=right] [x-circle]": {
        transformOrigin: "-50% 0",
    },
    ".tippy-popper[x-placement^=right] [x-circle].enter": {
        transform: "scale(1) translate(-50%, -50%)",
        opacity: 1,
    },
    ".tippy-popper[x-placement^=right] [x-circle].leave": {
        transform: "scale(0.15) translate(-50%, -50%)",
        opacity: 0,
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-circle]": {
        backgroundColor: "#fff",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow]": {
        borderRight: "7px solid #fff",
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow].arrow-small": {
        borderRight: "5px solid #fff",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.light-theme [x-arrow].arrow-big": {
        borderRight: "10px solid #fff",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-circle]": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow]": {
        borderRight: "7px solid rgba(0, 0, 0, 0.7)",
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow].arrow-small": {
        borderRight: "5px solid rgba(0, 0, 0, 0.7)",
        borderTop: "5px solid transparent",
        borderBottom: "5px solid transparent",
    },
    ".tippy-popper[x-placement^=right] .tippy-tooltip.transparent-theme [x-arrow].arrow-big": {
        borderRight: "10px solid rgba(0, 0, 0, 0.7)",
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
    },
    ".tippy-popper[x-placement^=right] [data-animation=perspective]": {
        transformOrigin: "left",
    },
    ".tippy-popper[x-placement^=right] [data-animation=perspective].enter": {
        opacity: 1,
        transform: "translateX(10px) rotateY(0)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=perspective].leave": {
        opacity: 0,
        transform: "translateX(0) rotateY(90deg)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=fade].enter": {
        opacity: 1,
        transform: "translateX(10px)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=fade].leave": {
        opacity: 0,
        transform: "translateX(10px)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=shift].enter": {
        opacity: 1,
        transform: "translateX(10px)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=shift].leave": {
        opacity: 0,
        transform: "translateX(0)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=scale].enter": {
        opacity: 1,
        transform: "translateX(10px) scale(1)",
    },
    ".tippy-popper[x-placement^=right] [data-animation=scale].leave": {
        opacity: 0,
        transform: "translateX(0) scale(0)",
    },
    ".tippy-popper .tippy-tooltip.transparent-theme": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    ".tippy-popper .tippy-tooltip.transparent-theme[data-animatefill]": {
        backgroundColor: "transparent",
    },

    ".tippy-popper .tippy-tooltip.light-theme": {
        color: "#26323d",
        boxShadow: "0 4px 20px 4px rgba(0, 20, 60, 0.1), 0 4px 80px -8px rgba(0, 20, 60, 0.2)",
        backgroundColor: "#fff",
    },
    ".tippy-popper .tippy-tooltip.light-theme[data-animatefill]": {
        backgroundColor: "transparent",
    },
    ".tippy-tooltip": {
        position: "relative",
        color: "#fff",
        borderRadius: "4px",
        fontSize: "0.95rem",
        padding: "0.4rem 0.8rem",
        textAlign: "center",
        willChange: "transform",
        backgroundColor: "#333",
    },
    ".tippy-tooltip--small": {
        padding: "0.25rem 0.5rem",
        fontSize: "0.8rem",
    },
    ".tippy-tooltip--big": {
        padding: "0.6rem 1.2rem",
        fontSize: "1.2rem",
    },
    ".tippy-tooltip[data-animatefill]": {
        overflow: "hidden",
        backgroundColor: "transparent",
    },
    ".tippy-tooltip[data-interactive]": {
        pointerEvents: "auto",
    },
    ".tippy-tooltip[data-inertia]": {
        transitionTimingFunction: "cubic-bezier(0.53, 2, 0.36, 0.85)",
    },
    ".tippy-tooltip [x-arrow]": {
        position: "absolute",
        width: 0,
        height: 0,
    },
    ".tippy-tooltip [x-circle]": {
        position: "absolute",
        willChange: "transform",
        backgroundColor: "#333",
        borderRadius: "50%",
        // width: "130%",
        width: "calc(110% + 2rem)",
        left: "50%",
        top: "50%",
        zIndex: "-1",
        overflow: "hidden",
        transition: "all ease",
    },
    ".tippy-tooltip [x-circle]:before": {
        content: "''",
        paddingTop: "90%",
        float: "left",
    },
    "@media (max-width: 450px)": {
        ".tippy-popper": {
            // maxWidth: "96%",
            maxWidth: "calc(100% - 20px)",
        },
    },
});
