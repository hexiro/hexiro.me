import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";

import { staggerChildren } from "@/commons/animations";

import { motion } from "framer-motion";

type ContainerProps = PropsWithChildren<ComponentProps<typeof Wrapper>>;

export default function Container({ children, ...props }: ContainerProps) {
    return (
        <Wrapper variants={staggerChildren} {...props}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled(motion.div, {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "2%",
    rowGap: "$4",

    // one-column layout
    "@lg": {
        paddingRight: "20%",
    },

    // two-column layout
    "@xl": {
        paddingRight: "10%",
    },

    // two-column layout
    "@xxl": {
        paddingRight: "20%",
    },
});
