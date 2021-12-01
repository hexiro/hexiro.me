import theme from "static/theme";

import { useWindowScroll, useWindowSize } from "react-use";
import styled from "styled-components";

export default function (): JSX.Element {
    const { height } = useWindowSize();
    const { y } = useWindowScroll();

    return (
        <SectionList height={height} y={y}>
            <li>
                <Section href="#me">
                    <SectionBar />
                    <SectionText>ME</SectionText>
                </Section>
            </li>
            <li>
                <Section href="#projects">
                    <SectionBar />
                    <SectionText>PROJECTS</SectionText>
                </Section>
            </li>
        </SectionList>
    );
}

interface SectionListProps {
    height: number;
    y: number;
}

const SectionList = styled.ul<SectionListProps>`
    position: fixed;
    top: 25px;
    left: 25px;
    opacity: ${props => {
        const { height, y } = props;

        const min = height * 0.2;
        const max = height * 0.45;

        if (y < min) return "1";
        if (y > max) return "0";

        const range = max - min;
        const relativeY = y - min;
        return 1 - relativeY / range;
    }};
`;

const Section = styled.a`
    display: block;
    transition: ease all 0.15s;

    &:focus {
        filter: unset;
    }

    &:hover {
        padding-left: 25px;
    }
`;

const SectionBar = styled.span`
    display: inline-block;
    height: 10px;
    width: 60px;
    z-index: -1;
    background-color: ${theme.accent.background};
    border-radius: 4px;
    margin-bottom: 5px;
    margin-left: -60px;
    margin-right: 5px;
`;

const SectionText = styled.span`
    display: inline-block;
    position: relative;
    font-style: italic;
    font-weight: 300;
    font-size: 2em;
`;
