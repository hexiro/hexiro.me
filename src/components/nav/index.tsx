import { useEffect, useState } from "react";

import theme from "commons/theme";
import { To } from "components/common";

import { useWindowScroll } from "react-use";
import styled from "styled-components";

interface NavProps {
    meRef: React.MutableRefObject<HTMLElement | null>;
    projectsRef: React.MutableRefObject<HTMLElement | null>;
}

export default function Nav({ meRef, projectsRef }: NavProps): JSX.Element {
    const [active, setActive] = useState(0);
    const { y } = useWindowScroll();

    useEffect(() => {
        const currentMe = meRef.current;
        const currentProjects = projectsRef.current;

        if (!currentMe || !currentProjects) return;

        const value = y + 500;

        if (value >= currentProjects.offsetTop) setActive(1);
        else if (value >= currentMe.offsetTop) setActive(0);
    }, [y, meRef, projectsRef]);

    return (
        <SectionList>
            <Section>
                <SectionBar>
                    <HighlightedSectionBar index={0} active={active} />
                </SectionBar>
                <To href="#me">
                    <SectionText>ME</SectionText>
                </To>
            </Section>
            <Section>
                <SectionBar>
                    <HighlightedSectionBar index={1} active={active} />
                </SectionBar>
                <To href="#projects">
                    <SectionText>PROJECTS</SectionText>
                </To>
            </Section>
        </SectionList>
    );
}

const SectionList = styled.ul`
    position: fixed;
    top: 25px;
    left: 25px;
    z-index: 2;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
`;

const Section = styled.li`
    display: block;
    white-space: nowrap;
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

const HighlightedSectionBar = styled.span<SectionBarProps>`
    display: block;
    border-radius: 4px;
    transition: ease all 0.225s;
    background-color: ${theme.accent.main};
    height: 100%;
    z-index: 2;
    width: ${props => {
        if (props.index === props.active) return "100%";
        return "0%";
    }};
`;

const SectionBar = styled.span`
    background-color: ${theme.accent.background};
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
