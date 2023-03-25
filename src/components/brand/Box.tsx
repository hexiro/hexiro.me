import { styled } from "@/theme";

import type { ComponentProps, PropsWithChildren } from "react";
import { useState } from "react";

import { slideFromBottom } from "@/commons/animations";

import { motion } from "framer-motion";

type BoxProps = PropsWithChildren<ComponentProps<typeof BoxContainer>> & {
    hoverable?: boolean;
};

export default function Box({ hoverable, children, ...props }: BoxProps) {
    const [animationComplete, setAnimationComplete] = useState(true);

    return (
        <BoxContainer
            variants={slideFromBottom}
            enableHover={hoverable && animationComplete}
            onAnimationStart={() => setAnimationComplete(false)}
            onAnimationComplete={() => setAnimationComplete(true)}
            {...props}
        >
            {children}
        </BoxContainer>
    );
}

const BoxContainer = styled(motion.div, {
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
        // needs to be !important for framer-motion & react-use-draggable-scroll in certain cases although not idea
        // should be reanalyzed in the future
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
