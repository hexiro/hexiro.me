import type { PropsWithChildren } from "react";

import { lightPop } from "commons/animations";
import theme from "commons/theme";

import { motion } from "framer-motion";
import styled from "styled-components";

type ToProps = PropsWithChildren<{ href: string }>;

export const To = ({ href, children }: ToProps) => (
    <Anchor href={href} rel="norefferer" target="_blank" whileHover={lightPop}>
        {children}
    </Anchor>
);

const Anchor = styled(motion.a)`
    display: inline-block;
    will-change: transform;

    color: ${theme.core.main};
    opacity: 0.85;
    font-weight: 300;

    &:hover {
        opacity: 1;
    }
    &:focus {
        filter: none;
    }
`;
