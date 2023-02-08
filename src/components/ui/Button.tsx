import { styled } from "@/theme";

const Button = styled("button", {
    height: "$6",
    paddingX: "$4",
    borderRadius: "$xxl",
    fontWeight: 600,
    lineHeight: 1,

    willTransition: "background-color, border-color",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",

    defaultVariants: {
        priority: "secondary",
    },

    variants: {
        priority: {
            secondary: {
                backgroundColor: "$background-secondary",
                color: "$text-primary",
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "$lighten-10",

                "&:hover": {
                    backgroundColor: "$background-secondary-alpha-75",
                    borderColor: "$lighten-5",
                },
            },
        },
    },
});

export default Button;
