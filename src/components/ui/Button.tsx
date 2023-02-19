import { styled } from "@/theme";

const Button = styled("button", {
    fontWeight: 600,
    lineHeight: 1,

    willTransition: "background-color, border-color",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",

    defaultVariants: {
        priority: "secondary",
        size: "md",
    },

    variants: {
        size: {
            sm: {
                fontSize: "0.9em",
                height: "$5",
                paddingX: "$3",
                borderRadius: "$xl",
            },
            md: {
                height: "$6",
                paddingX: "$4",
                borderRadius: "$xxl",
            },
        },
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
