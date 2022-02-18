import type { MutableRefObject } from "react";

import { fadeAndMovements } from "commons/animations";
import theme from "commons/theme";
import { Header } from "components/common";

import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface SectionProps {
    name: string;
    index: number;
    active: number;
    previous: number;
    current?: IntersectionObserverEntry;
}

export default function Section({
    name,
    index,
    active,
    previous,
    current,
}: SectionProps): JSX.Element {
    const onTap = () => {
        if (!current) return;
        current.target.scrollIntoView();
    };

    return (
        <SectionContainer>
            <SectionName onTap={onTap} whileHover="pop" variants={fadeAndMovements}>
                {name.toUpperCase()}
            </SectionName>
            <SectionBar>
                <HighlightedSectionBar index={index} active={active} previous={previous} />
            </SectionBar>
        </SectionContainer>
    );
}

const SectionName = styled(motion.h3)`
    will-change: transform;
    cursor: pointer;
    font-weight: 400;
    color: ${theme.accent.main};
`;

const SectionContainer = styled.li`
    display: inline-block;
    position: relative;
    white-space: nowrap;
    transition: ease all 0.15s;
    margin: 0 20px;
    user-select: none;
`;

interface SectionBarProps {
    index: number;
    active: number;
    previous: number;
}

const SectionBar = styled.div`
    position: relative;
    display: block;
    height: 5px;
    width: 100%;
    border-radius: 4px;
    z-index: -1;
    transition: ease all 0.225s;
    background: ${theme.accent.background};
`;

const HighlightedSectionBar = styled(SectionBar)<SectionBarProps>`
    background: ${theme.accent.main};
    z-index: 2;
    width: ${({ index, active }) => {
        if (index === active) return "100%";
        return "0%";
    }};
    ${({ active, previous, index }) => {
        // RETURN EARLY -- COME FROM LEFT
        if (index === active) {
            if (previous <= active) return;
        }
        if (index === previous) {
            if (previous >= active) return;
        }
        // COME FROM RIGHT
        return css`
            position: absolute;
            right: 0;
        `;
    }}
`;
