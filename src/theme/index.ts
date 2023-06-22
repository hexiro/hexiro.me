// import type { PropertyValue } from "@stitches/react";
// import { createStitches, defaultThemeMap } from "@stitches/react";
// import type * as CSSUtil from "@stitches/react/types/css-util";

// import { Plus_Jakarta_Sans as JakartaSans } from "next/font/google";

// const media = {
//     xxs: "(min-width: 360px)",
//     xs: "(min-width: 480px)",
//     sm: "(min-width: 640px)",
//     md: "(min-width: 768px)",
//     lg: "(min-width: 1024px)",
//     xl: "(min-width: 1280px)",
//     xxl: "(min-width: 1536px)",
// };

// export const breakpoints = Object.fromEntries(
//     Object.entries(media).map(([key, value]) => [key, Number(value.replace(/\D/g, ""))])
// ) as Record<keyof typeof media, number>;

// const font = JakartaSans({
//     weight: "variable",
//     style: "normal",
//     display: "swap",
//     preload: true,
//     subsets: ["latin"],
// });

// const stitches = createStitches({
//     prefix: "hexiro",
//     theme: {
//         colors: {
//             // brand colors
//             "brand-primary-rgb": "75, 255, 159",
//             "brand-primary": "rgb($brand-primary-rgb)",
//             "brand-secondary": "hsl(147deg 51% 34%)",
//             "brand-accent": "hsl(133deg 25% 85%)",
//             "brand-tertiary": "rgba(232, 255, 232, 0.2)",
//             // text colors
//             "text-primary": "#D2E0D5",
//             "text-secondary": "hsl(137deg 5% 67%)",
//             // background colors
//             "background-primary": "#191C1D",
//             "background-secondary-rgb": "41, 44, 47",
//             "background-secondary": "rgb($background-secondary-rgb)",
//             "background-tertiary": "#778088",
//             "background-blended": "#212426",
//             // modifiers
//             "lighten-5": "rgba(255, 255, 255, 0.05)",
//             "lighten-10": "rgba(255, 255, 255, 0.1)",
//             // alpha
//             "brand-primary-alpha-75": "rgba($brand-primary-rgb, 0.75)",
//             "brand-primary-alpha-50": "rgba($brand-primary-rgb, 0.5)",
//             "brand-primary-alpha-25": "rgba($brand-primary-rgb, 0.25)",
//             "background-secondary-alpha-75": "rgba($background-secondary-rgb, 0.75)",
//             "background-secondary-alpha-50": "rgba($background-secondary-rgb, 0.5)",
//             "background-secondary-alpha-25": "rgba($background-secondary-rgb, 0.25)",
//             // misc.
//             "tippy-tooltip-color": "rgb(21, 23, 25)",
//         },
//         space: {
//             1: "5px",
//             2: "10px",
//             3: "15px",
//             4: "20px",
//             5: "25px",
//             6: "35px",
//             7: "45px",
//             8: "65px",
//             9: "80px",
//             "main-y-padding": "$5",
//             "main-x-padding": "7%",
//             "main-x-padding-lg": "10%",
//         },
//         fonts: {
//             heading: `${font.style.fontFamily}, sans-serif`,
//             text: `${font.style.fontFamily}, sans-serif`,
//         },
//         sizes: {
//             1: "5px",
//             2: "10px",
//             3: "15px",
//             4: "20px",
//             5: "25px",
//             6: "35px",
//             7: "45px",
//             8: "65px",
//             9: "80px",
//             "nav-height": "124px",
//             "tippy-arrow-small": "5px",
//             "tippy-arrow-medium": "7px",
//             "tippy-arrow-large": "10px",
//         },
//         radii: {
//             xs: "0.125rem",
//             sm: "0.25rem",
//             md: "0.375rem",
//             lg: "0.5rem",
//             xl: "0.75rem",
//             "xxl": "1rem",
//             "max": "9999px",
//         },
//         lineHeights: {
//             "single": 1,
//             "multi": 1.2,
//         },
//         shadows: {
//             "xs": "0 0 0 1px rgba(0, 0, 0, 0.05)",
//             "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
//             "base": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
//             "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//             "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
//             "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
//         },
//         zIndices: {
//             "base": 0,
//             "above": 1,
//             "max": 9999,
//         },
//         transitionDurations: {
//             "fast": "0.2s",
//             "medium": "0.3s",
//             "slow": "0.45s",
//         },
//         transitionTimingFunctions: {
//             "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
//         },
//     },
//     media,
//     utils: {
//         willTransition: (value: PropertyValue<"willChange">) => ({
//             willChange: value,
//             transitionProperty: value,
//         }),
//         size: (value: PropertyValue<"width">) => ({
//             width: value,
//             height: value,
//         }),
//         maxSize: (value: PropertyValue<"maxWidth">) => ({
//             maxWidth: value,
//             maxHeight: value,
//         }),
//         minSize: (value: PropertyValue<"minWidth">) => ({
//             minWidth: value,
//             minHeight: value,
//         }),
//         paddingX: (value: PropertyValue<"paddingLeft">) => ({
//             paddingLeft: value,
//             paddingRight: value,
//         }),
//         paddingY: (value: PropertyValue<"paddingTop">) => ({
//             paddingTop: value,
//             paddingBottom: value,
//         }),
//         marginX: (value: PropertyValue<"marginLeft">) => ({
//             marginLeft: value,
//             marginRight: value,
//         }),
//         marginY: (value: PropertyValue<"marginTop">) => ({
//             marginTop: value,
//             marginBottom: value,
//         }),
//         borderRightRadius: (value: PropertyValue<"borderTopRightRadius">) => ({
//             borderTopRightRadius: value,
//             borderBottomRightRadius: value,
//         }),
//         borderBottomRadius: (value: PropertyValue<"borderBottomLeftRadius">) => ({
//             borderBottomLeftRadius: value,
//             borderBottomRightRadius: value,
//         }),
//         borderTopRadius: (value: PropertyValue<"borderTopLeftRadius">) => ({
//             borderTopLeftRadius: value,
//             borderTopRightRadius: value,
//         }),
//         borderLeftRadius: (value: PropertyValue<"borderTopLeftRadius">) => ({
//             borderTopLeftRadius: value,
//             borderBottomLeftRadius: value,
//         }),
//         gridColumns: (value: string | number) => ({
//             gridTemplateColumns: `repeat(${value}, minmax(0, 1fr))`,
//         }),
//         gridRows: (value: string | number) => ({
//             gridTemplateRows: `repeat(${value}, minmax(0, 1fr))`,
//         }),
//     },
//     themeMap: {
//         ...defaultThemeMap,
//         transitionDuration: "transitionDurations",
//         transitionTimingFunction: "transitionTimingFunctions",
//     },
// });

// export const { styled, css, getCssText, config, theme } = stitches;
// const { globalCss } = stitches;

// export type Media = (typeof config)["media"];
// export type Theme = (typeof config)["theme"];
// export type ThemeMap = (typeof config)["themeMap"];
// export type Utils = (typeof config)["utils"];
// export type CSS = CSSUtil.CSS<Media, Theme, ThemeMap, Utils>;

// export const globalStyles = globalCss({
//     "*, *:before, *:after": {
//         margin: 0,
//         padding: 0,
//         boxSizing: "border-box",
//     },
//     "::-webkit-scrollbar": {
//         width: "0.35em",
//         height: "0.35em",
//     },
//     "::-webkit-scrollbar-track": {
//         boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
//     },
//     "::-webkit-scrollbar-thumb": {
//         backgroundColor: "$brand-secondary",
//         borderLeftRadius: "$xl",
//         borderRightRadius: "$md",
//     },
//     "html, body": {
//         scrollBehavior: "smooth",
//     },
//     body: {
//         fontFamily: "$text",
//         fontWeight: 400,
//         fontSize: 16,
//         lineHeight: 1.2,
//         height: "100%",
//         minHeight: "100vh",
//         minWidth: "320px",
//         overflowX: "hidden",
//         color: "$text-primary",
//         backgroundColor: "$background-primary",
//         "-webkit-font-smoothing": "antialiased",
//         "-moz-osx-font-smoothing": "grayscale",
//         textRendering: "optimizeLegibility",
//     },
//     "input, button, textarea, select, hr": {
//         all: "unset",
//     },
//     "button": {
//         cursor: "pointer",
//     },
//     "li": {
//         listStyle: "none",
//     },
// });

// globalStyles();
