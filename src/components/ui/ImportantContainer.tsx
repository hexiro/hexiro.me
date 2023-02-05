import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";
import { useContext } from "react";

import { CursorContext } from "@/commons/contexts";

import { motion } from "framer-motion";

type ImportantContainerProps = PropsWithChildren<
    ComponentProps<typeof ImportantContainerContainer>
>;

const ImportantContainer = ({ children, ...props }: ImportantContainerProps) => {
    const { wrap, unwrap, scroll } = useContext(CursorContext);

    return (
        <ImportantContainerContainer
            onMouseEnter={(e) => wrap(e.currentTarget)}
            onMouseLeave={unwrap}
            onScroll={(e) => scroll(e)}
            {...props}
        >
            {children}
        </ImportantContainerContainer>
    );
};

const ImportantContainerContainer = styled(motion.div, {
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

export default ImportantContainer;
