import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { IconType } from "@/commons/icons";

import type { Link } from "components/ui";

type ButtonProps = Omit<ComponentProps<typeof ButtonContainer>, "hasIcon"> &
    ButtonLinkButtonProps & {
        icon?: IconType;
    };

// may be a easier way to allow polymorphism?
type ButtonLinkButtonProps =
    | {
          as?: never;
          href?: never;
      }
    | {
          as: typeof Link;
          href: string;
      };

export default function Button({ icon, children, ...props }: ButtonProps) {
    return (
        <ButtonContainer hasIcon={typeof icon !== "undefined"} {...props}>
            {icon ? icon() : null}
            {children}
        </ButtonContainer>
    );
}

export const ButtonContainer = styled("button", {
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
                borderRadius: "$lg",
            },
            md: {
                height: "$6",
                paddingX: "$4",
                borderRadius: "$xl",
            },
            lg: {
                height: "2.75em",
                paddingX: "$5",
                borderRadius: "$xl",
                fontWeight: 700,
            },
        },
        priority: {
            primary: {
                $$color: "$colors$text-primary",
                $$bgColor: "$colors$brand-secondary",
                $$borderColor: "rgba($colors$brand-primary-rgb, 0.3)",
                $$hoverColor: "rgba($colors$brand-primary-rgb, 0.3)",
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
