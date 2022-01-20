import type { PropsWithChildren } from "react";

import theme from "commons/theme";

import type { MotionProps } from "framer-motion";
import { motion } from "framer-motion";
import styled from "styled-components";

type PopProps =
    | { pop?: false; popShift?: never }
    | ({ pop: true; popShift?: number } & MotionProps);

type TapProps = { tap?: false } | ({ tap: true } & MotionProps);

type GeneralMotionProps =
    | { pop: true; pointer?: boolean }
    | { tap: true; pointer?: boolean }
    | { tap?: boolean; pop?: boolean; pointer?: never };

type HeaderProps = PropsWithChildren<PopProps & TapProps & GeneralMotionProps>;

interface PoppedHeaderProps {
    pointer?: boolean;
}

export const Header = ({
    pop,
    popShift,
    tap,
    pointer,
    children,
    ...all
}: HeaderProps): JSX.Element => {
    if (pop || tap) {
        return (
            <PoppedHeader
                whileHover={pop ? { translateY: (popShift ?? 3) * -1 } : undefined}
                whileTap={tap ? { scale: 0.92 } : undefined}
                pointer={pointer}
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

const PoppedHeader = styled(motion.span)<PoppedHeaderProps>`
    display: inline-block;
    color: ${theme.accent.main};
    font-weight: 400;
    will-change: transform;
    ${({ pointer }) => {
        if (pointer) return "cursor: pointer;";
    }}
`;
