import { To } from "components/common";

import theme from "commons/theme";
import styled from "styled-components";

interface NavProps {
    active: number;
}

export const Nav = ({ active }: NavProps): JSX.Element => {
    return (
        <SectionList>
            <Section>
                <SectionBar index={0} active={active} />
                <To href="#me">
                    <SectionText>ME</SectionText>
                </To>
            </Section>
            <Section>
                <SectionBar index={1} active={active} />
                <To href="#projects">
                    <SectionText>PROJECTS</SectionText>
                </To>
            </Section>
        </SectionList>
    );
};

const SectionList = styled.ul`
    position: fixed;
    top: 25px;
    left: 25px;
    z-index: 2;
`;

const Section = styled.li`
    display: block;
    transition: ease all 0.15s;

    &:focus {
        filter: unset;
    }

    &:hover {
        padding-left: 25px;
    }
`;

interface SectionBarProps {
    index: number;
    active: number;
}

const SectionBar = styled.span<SectionBarProps>`
    background-color: ${props => {
        if (props.index === props.active) return theme.accent.main;
        return theme.accent.background;
    }};

    display: inline-block;
    height: 10px;
    width: 60px;
    z-index: -1;
    transition: ease all 0.225s;
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
