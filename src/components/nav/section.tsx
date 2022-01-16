import theme from "commons/theme";
import { To } from "components/common";

import styled from "styled-components";

interface SectionProps {
    name: string;
    highlighted: boolean;
}

export default function Section({ name, highlighted }: SectionProps): JSX.Element {
    return (
        <SectionContainer>
            <To href={`#${name.toLowerCase()}`}>
                <SectionText>{name.toUpperCase()}</SectionText>
            </To>
            <SectionBar>
                <HighlightedSectionBar highlighted={highlighted} />
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
    highlighted: boolean;
}

const SectionBar = styled.div`
    display: block;
    height: 8px;
    width: 100%;
    border-radius: 4px;
    z-index: -1;
    transition: ease all 0.225s;
    background: ${theme.accent.background};
`;

const HighlightedSectionBar = styled(SectionBar)<SectionBarProps>`
    background: ${theme.accent.main};
    z-index: 2;

    width: ${({ highlighted }) => {
        if (highlighted) return "100%";
        return "0%";
    }};
`;

const SectionText = styled.span`
    display: inline-block;
    position: relative;
    font-style: italic;
    font-weight: 300;
    font-size: 2em;
`;
