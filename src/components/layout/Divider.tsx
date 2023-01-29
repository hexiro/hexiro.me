import { styled } from "@/theme";

const Divider = styled("hr", {
    width: "100%",

    defaultVariants: {
        orientation: "horizontal",
    },

    variants: {
        orientation: {
            horizontal: {
                borderBottom: "1px solid $lighten-10",
                marginY: "$2",
            },
            vertical: {
                borderRight: "1px solid $lighten-10",
                marginX: "$2",
            },
        },
    },
});

export default Divider;
