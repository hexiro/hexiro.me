import theme from "static/theme";

import styled from "styled-components";

export default function (): JSX.Element {
    return (
        <SectionList>
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

const SectionList = styled.ul`
    margin-top: 25px;
    margin-left: 25px;
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
