import { styled } from "@/theme";

import type { ComponentProps, PropsWithChildren } from "react";
import { useState } from "react";

import { slideFromBottom } from "@/commons/framer";

import { motion } from "framer-motion";

type BrandedBoxProps = PropsWithChildren<ComponentProps<typeof BrandedBoxContainer>> & {
    hoverable?: boolean;
};

export default function BrandedBox({ hoverable, children, ...props }: BrandedBoxProps) {
    const [animationComplete, setAnimationComplete] = useState(false);

    return (
        <BrandedBoxContainer
            variants={slideFromBottom}
            enableHover={hoverable && animationComplete}
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
        // needs to be !important for framer-motion & react-use-draggable-scroll in certain cases
        enableHover: {
            true: {
                transitionDuration: "$fast !important",
                transitionTimingFunction: "$ease-in-out !important",
                willTransition: "transform !important",
                transform: "none !important",

                "&:hover": {
                    transform: "translateY(-6px)!important",
                },
            },
        },
    },
});
