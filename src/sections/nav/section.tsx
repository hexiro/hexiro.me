import type { MutableRefObject } from "react";

import theme from "commons/theme";
import { Header } from "components/common";

import { motion } from "framer-motion";
import styled from "styled-components";

interface SectionProps {
    name: string;
    index: number;
    active: number;
    previous: number;
    sectionRef: MutableRefObject<HTMLElement | null>;
}

export default function Section({
    name,
    index,
    active,
    previous,
    sectionRef,
}: SectionProps): JSX.Element {
    const onTap = () => {
        if (!sectionRef?.current) return;
        sectionRef.current.scrollIntoView();
    };

    return (
        <SectionContainer>
            <motion.h3
                onTap={onTap}
                whileHover={{ marginTop: "-3px", marginBottom: "3px" }}
                whileTap={{ scale: 0.92 }}
            >
                <Header>{name.toUpperCase()}</Header>
            </motion.h3>
            <SectionBar>
                <HighlightedSectionBar index={index} active={active} previous={previous} />
            </SectionBar>
        </SectionContainer>
    );
}

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
        return `
            position: absolute;
            right: 0;
        `;
    }}
`;
