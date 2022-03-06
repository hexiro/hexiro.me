import { pop, fade, spring, fadeChildren } from "commons/animations";
import theme from "commons/theme";

import { motion } from "framer-motion";
import styled from "styled-components";

interface SectionProps {
    name: string;
    index: number;
    active: number;
    current?: IntersectionObserverEntry;
}

export default function Section({ name, index, active, current }: SectionProps): JSX.Element {
    const onTap = () => {
        if (!current) return;
        current.target.scrollIntoView();
    };

    return (
        <SectionContainer variants={fadeChildren}>
            <SectionName whileHover={pop} variants={fade} onTap={onTap}>
                {name.toUpperCase()}
            </SectionName>
            <motion.div variants={fade}>
                <SectionBar>
                    {active === index && (
                        <HighlightedSectionBar layoutId="underline" transition={spring} />
                    )}
                </SectionBar>
            </motion.div>
        </SectionContainer>
    );
}

const SectionName = styled(motion.h3)`
    will-change: transform;
    cursor: pointer;
    font-weight: 400;
    color: ${theme.accent.main};
`;

const SectionContainer = styled(motion.li)`
    display: inline-block;
    position: relative;
    white-space: nowrap;
    transition: ease all 0.15s;
    margin: 0 20px;
    user-select: none;
`;

const SectionBar = styled.div`
    height: 5px;
    width: 100%;
    border-radius: 4px;
    z-index: -1;
    background: ${theme.accent.background};
`;

const HighlightedSectionBar = styled(motion.div)`
    position: absolute;
    height: 5px;
    width: 100%;
    border-radius: 4px;
    z-index: 2;
    background: ${theme.accent.main};
`;
