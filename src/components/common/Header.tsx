import type { PropsWithChildren } from "react";

import theme from "commons/theme";

import type { MotionProps } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";

type HeaderMotionProps =
    | { pop?: false; popShift?: never; tap?: never }
    | ({ pop: true; popShift?: number; tap?: boolean } & MotionProps);

type HeaderProps = PropsWithChildren<HeaderMotionProps>;

export const Header = ({ pop, popShift, tap, children, ...all }: HeaderProps): JSX.Element => {
    if (pop) {
        return (
            <PoppedHeader
                whileHover={{ translateY: (popShift ?? 3) * -1 }}
                whileTap={tap ? { scale: 0.92 } : undefined}
                {...all}
            >
                {children}
            </PoppedHeader>
        );
    } else {
        return <NormalHeader>{children}</NormalHeader>;
    }
};

const NormalHeader = styled.span`
    color: ${theme.accent.main};
    font-weight: 400;
`;

const PoppedHeader = styled(motion.span)`
    display: inline-block;
    color: ${theme.accent.main};
    font-weight: 400;
    will-change: transform;
    cursor: pointer;
`;
