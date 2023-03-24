import { styled } from "@/theme";

const Divider = styled("hr", {
    display: "block",
    borderRadius: "$max",

    defaultVariants: {
        orientation: "horizontal",
        size: 1,
        margin: 10,
    },

    variants: {
        orientation: {
            horizontal: {
                width: "100%",
                borderBottom: "$$size solid $lighten-10",
                marginY: "$$margin",
            },
            vertical: {
                height: "100%",
                borderRight: "$$size solid $lighten-10",
                marginX: "$$margin",
            },
        },
        size: {
            1: {
                $$size: "1px",
            },
            2: {
                $$size: "2px",
            },
        },
        margin: {
            4: {
                $$margin: "4px",
            },
            8: {
                $$margin: "8px",
            },
            10: {
                $$margin: "10px",
            },
            12: {
                $$margin: "12px",
            },
            16: {
                $$margin: "16px",
            },
        },
    },
});

export default Divider;
