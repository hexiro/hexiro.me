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
                green: "#4BFF9F",
                "off-white": "#E8E8E8",
                text: "#CACECA",
                subtitle: "E4EBE0",
                background: {
                    DEFAULT: "#1E1B15",
                    secondary: "#2E2A24",
                    sidebar: "#2A2722",
                    accent: "#4E4D44",
                    "light-accent": "#3C362B",
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
