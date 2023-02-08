import { styled } from "@/theme";

import type { ComponentProps, PropsWithChildren } from "react";

import { slideFromBottom } from "@/commons/framer";

import { motion } from "framer-motion";

type BrandedBoxProps = PropsWithChildren<ComponentProps<typeof BrandedBoxContainer>>;

export default function BrandedBox({ children, ...props }: BrandedBoxProps) {
    return (
        <BrandedBoxContainer variants={slideFromBottom} {...props}>
            {children}
        </BrandedBoxContainer>
    );
}

const BrandedBoxContainer = styled(motion.div, {
    position: "relative",
    backgroundColor: "$background-secondary",
    borderRadius: "$xl",
    border: "2px solid $lighten-10",
    boxShadow: "$md",
    display: "flex",
    flexDirection: "row",
    paddingX: "20px",
    paddingY: "16px",
});
