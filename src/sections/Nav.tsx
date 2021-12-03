import theme from "static/theme";

import styled from "styled-components";

interface NavProps {
    active: number;
}

export const Nav = ({ active }: NavProps): JSX.Element => {
    return (
        <SectionList>
            <li>
                <Section href="#me">
                    <SectionBar index={0} active={active} />
                    <SectionText>ME</SectionText>
                </Section>
            </li>
            <li>
                <Section href="#projects">
                    <SectionBar index={1} active={active} />
                    <SectionText>PROJECTS</SectionText>
                </Section>
            </li>
        </SectionList>
    );
};

const SectionList = styled.ul`
    position: fixed;
    top: 25px;
    left: 25px;
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
