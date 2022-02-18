import Link from "next/link";
import type { PropsWithChildren } from "react";

import { movements } from "commons/animations";
import theme from "commons/theme";

import { motion } from "framer-motion";
import styled from "styled-components";

type ToProps = PropsWithChildren<{ href: string }>;

export const To = ({ href, children }: ToProps) => (
    <Link passHref href={href}>
        <Anchor rel="norefferer" target="_blank">
            <Animation whileHover="lightPop" variants={movements}>
                {children}
            </Animation>
        </Anchor>
    </Link>
);

const Animation = styled(motion.span)`
    will-change: transform;
    display: inline-block;
`;

const Anchor = styled(motion.a)`
    color: ${theme.core.main};
    opacity: 0.85;
    font-weight: 300;
    transition: ease all 0.2s;
    &:hover {
        opacity: 1;
    }
    &:focus {
        filter: none;
    }
`;
