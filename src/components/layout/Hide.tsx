import { styled } from "theme";

const Hide = styled("div", {
    lineHeight: 1,
    variants: {
        below: {
            sm: {
                display: "none",
                "@sm": {
                    display: "unset",
                },
            },
            md: {
                display: "none",
                "@md": {
                    display: "unset",
                },
            },
            lg: {
                display: "none",
                "@lg": {
                    display: "unset",
                },
            },
            xl: {
                display: "none",
                "@xl": {
                    display: "unset",
                },
            },
            "2xl": {
                display: "none",
                "@2xl": {
                    display: "unset",
                },
            },
        },
        above: {
            sm: {
                "@sm": {
                    display: "none",
                },
            },
            md: {
                "@md": {
                    display: "none",
                },
            },
            lg: {
                "@lg": {
                    display: "none",
                },
            },
            xl: {
                "@xl": {
                    display: "none",
                },
            },
            "2xl": {
                "@2xl": {
                    display: "none",
                },
            },
        },
    },
});

export default Hide;
