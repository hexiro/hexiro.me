import theme from "commons/theme";
import { To } from "components";

import styled from "styled-components";

interface SectionProps {
    name: string;
    index: number;
    active: number;
    previous: number;
}

export default function Section({ name, index, active, previous }: SectionProps): JSX.Element {
    return (
        <SectionContainer>
            <To href={`#${name.toLowerCase()}`}>
                <SectionText>{name.toUpperCase()}</SectionText>
            </To>
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
    padding: 0 10px;
    margin: 0 10px;
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

const SectionText = styled.span`
    display: inline-block;
    position: relative;
    font-weight: 300;
    font-size: 2em;
`;
