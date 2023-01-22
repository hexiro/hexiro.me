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
            primary: {
                backgroundColor: "$brand-primary",
                color: "$background-secondary",
                fontWeight: 800,

                "&:hover": {
                    backgroundColor: "$brand-primary-alpha-50",
                },
            },
            secondary: {
                backgroundColor: "$background-secondary",
                color: "$text-primary",
                borderWidth: "1px",
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
