import { styled } from "@/theme";

import type { ComponentProps, PropsWithChildren } from "react";
import { useState } from "react";

import { slideFromBottom } from "@/commons/framer";

import { motion } from "framer-motion";

type BrandedBoxProps = PropsWithChildren<ComponentProps<typeof BrandedBoxContainer>>;

export default function BrandedBox({ children, ...props }: BrandedBoxProps) {
    const [animationComplete, setAnimationComplete] = useState(false);

    return (
        <BrandedBoxContainer
            variants={slideFromBottom}
            enableHover={animationComplete}
            onAnimationComplete={() => setAnimationComplete(true)}
            {...props}
        >
            {children}
        </BrandedBoxContainer>
    );
}

const BrandedBoxContainer = styled(motion.div, {
    position: "relative",
    backgroundColor: "$background-secondary",
    borderRadius: "$xl",
    border: "2px solid $lighten-10",
    boxShadow: "$lg",
    display: "flex",
    flexDirection: "row",
    paddingX: "20px",
    paddingY: "16px",

    variants: {
        enableHover: {
            true: {
                transitionDuration: "$fast",
                transitionTimingFunction: "$ease-in-out",
                willTransition: "transform",

                "&:hover": {
                    transform: "translateY(-6px)!important",
                },
            },
        },
    },
});
