const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        colors: {
            black: "#000",
            white: "#fff",
            transparent: "transparent",
            current: "currentColor",
            green: "hsla(148, 100%, 65%, 1)",
            "off-white": "hsla(0, 0%, 91%, 1)",
            text: "hsla(119, 5%, 70%, 1)",
            subtitle: "hsla(100, 10%, 80%, 1)",
            background: {
                DEFAULT: "hsla(37, 18%, 10%, 1)",
                secondary: "#2e2a23",
                accent: "hsla(54, 7%, 29%, 1)",
                "light-accent": "hsla(40, 17%, 20%, 1)",
                "gray-accent": "hsla(35, 4%, 15%, 1)",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
                mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
            },

            fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                base: "1.25rem",
                lg: "1.5rem",
                xl: "2rem",
                "2xl": "2.5rem",
                "3xl": "3rem",
                "4xl": "3.5rem",
                "5xl": "4rem",
                "6xl": "4.5rem",
                "7xl": "5rem",
                "8xl": "5.5rem",
                "9xl": "6rem",
            },
            transitionDuration: {
                fast: "200ms",
                normal: "300ms",
                slow: "450ms",
            },
            scale: {
                98: "0.98",
                102: "1.02",
            },
            lineHeight: {
                "extra-tight": "1.1",
            },
            keyframes: {
                ellipsis: {
                    "0%": { content: "''" },
                    "50%": { content: "'.'" },
                    "100%": { content: "'..'" },
                },
                "full-ellipsis": {
                    "25%": { content: "'.'" },
                    "50%": { content: "'..'" },
                    "75%": { content: "'...'" },
                },
            },
            animation: {
                ellipsis: "ellipsis 2s linear infinite",
                "full-ellipsis": "full-ellipsis 3s linear infinite",
            },
            screens: {
                xs: "480px",
                xxs: "320px",
                tall: { raw: "(min-height: 768px)" },
            },
        },
    },
    plugins: [
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    "animation-delay": (value) => {
                        return {
                            "animation-delay": value,
                        };
                    },
                },
                {
                    values: theme("transitionDelay"),
                }
            );
        }),
    ],
};
