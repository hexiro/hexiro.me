import { useEffect, useState } from "react";

import { To } from "components/common";

import theme from "commons/theme";
import { useWindowScroll } from "react-use";
import styled from "styled-components";

interface NavProps {
    refs: React.MutableRefObject<HTMLElement | null>[];
}

export default function Nav({ refs }: NavProps): JSX.Element {
    const [active, setActive] = useState(0);
    const { y } = useWindowScroll();

    useEffect(() => {
        const value = y + 500;

        const reversed = refs.slice().reverse();
        const reversedIndex = reversed.findIndex(x => {
            const current = x.current;
            if (!current) return false;
            return value >= current.offsetTop;
        });

        if (reversedIndex === -1) return;

        const index = refs.length - 1 - reversedIndex;
        setActive(index);
    }, [y, refs]);

    return (
        <SectionList>
            {refs.map((ref, index) => {
                const id = ref.current?.id;
                if (!id) return null;
                return (
                    <Section key={id}>
                        <SectionBar>
                            <HighlightedSectionBar index={index} active={active} />
                        </SectionBar>
                        <To href={`#${id}`}>
                            <SectionText>{id.toUpperCase()}</SectionText>
                        </To>
                    </Section>
                );
            })}
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
