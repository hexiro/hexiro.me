import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { IconType } from "@/commons/icons";

type ButtonProps = Omit<ComponentProps<typeof ButtonContainer>, "hasIcon"> & {
    icon?: IconType;
};

export default function Button({ icon, children, ...props }: ButtonProps) {
    return (
        <ButtonContainer hasIcon={typeof icon !== "undefined"} {...props}>
            {icon ? icon() : null}
            {children}
        </ButtonContainer>
    );
}

const ButtonContainer = styled("button", {
    fontWeight: 600,
    lineHeight: 1,

    willTransition: "background-color, border-color",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",

    defaultVariants: {
        priority: "secondary",
        size: "md",
    },

    backgroundColor: "$$bgColor",
    color: "$$color",
    borderWidth: "2px",
    borderStyle: "solid",

    borderColor: "$$borderColor",
    "&:hover": {
        borderColor: "$$hoverColor",
    },

    variants: {
        hasIcon: {
            true: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "$1",

                "& > svg": {
                    color: "$$color",
                },
            },
        },
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
            lg: {
                height: "40px",
                paddingX: "$5",
                borderRadius: "$xxl",
                fontWeight: 700,
            },
        },
        priority: {
            primary: {
                $$color: "$colors$text-primary",
                $$bgColor: "hsl(147, 36%, 25%)",
                $$borderColor: "rgba($colors$brand-primary-rgb, 0.2)",
                $$hoverColor: "rgba($colors$brand-primary-rgb, 0.35)",
            },
            secondary: {
                $$color: "$colors$text-secondary",
                $$bgColor: "$colors$background-secondary",
                $$borderColor: "rgba(255, 255, 255, 0.1)",
                $$hoverColor: "rgba(255, 255, 255, 0.2)",
            },
        },
    },
});
