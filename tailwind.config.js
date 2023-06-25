/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                green: "hsla(148, 100%, 65%, 1)",
                "off-white": "hsla(0, 0%, 91%, 1)",
                text: "hsla(119, 5%, 80%, 1)",
                subtitle: "hsla(100, 10%, 80%, 1)",
                background: {
                    DEFAULT: "hsla(37, 18%, 10%, 1)",
                    secondary: "hsla(38, 13%, 16%, 1)",
                    accent: "hsla(54, 7%, 29%, 1)",
                    "light-accent": "hsla(40, 17%, 20%, 1)",
                },
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
            lineHeight: {
                "extra-tight": "1.1",
            },
        },
    },
    plugins: [require("@kamona/tailwindcss-perspective")],
};
