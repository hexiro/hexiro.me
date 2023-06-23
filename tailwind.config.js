/** @type {import('tailwindcss').Config} */
module.exports = {
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
                subtitle: "hsla(100, 20%, 90%, 1)",
                background: {
                    DEFAULT: "hsla(37, 18%, 10%, 1)",
                    secondary: "hsla(38, 13%, 16%, 1)",
                    accent: "hsla(54, 7%, 29%, 1)",
                    "light-accent": "hsla(40, 17%, 20%, 1)",
                },
            },
            // lineHeight: {
            //     single: "1",
            //     multi: "1.2",
            //     paragraph: "1.5",
            // },
            // transitionDuration: {
            //     fast: "200ms",
            //     normal: "300ms",
            //     slow: "450ms",
            // },
        },
    },
    plugins: [],
};
