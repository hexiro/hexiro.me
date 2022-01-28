import { useEffect, useState } from "react";

import { fadeDown } from "commons/animations";
import theme from "commons/theme";
import Hex from "sections/nav/hex";
import Section from "sections/nav/section";

import { AnimatePresence, motion } from "framer-motion";
import { useMedia, useWindowScroll } from "react-use";
import styled from "styled-components";

interface NavProps {
    me?: IntersectionObserverEntry;
    projects?: IntersectionObserverEntry;
    contributions?: IntersectionObserverEntry;
}

export default function Nav({ me, projects, contributions }: NavProps): JSX.Element {
    // active section
    const [active, setActive] = useState(0);
    // previously active section
    const [previous, setPrevious] = useState(0);
    // window y position
    const windowScroll = useWindowScroll();
    const isWiderThan600px = useMedia("(max-width: 600px)");

    // add 1/4 of page's height to y as a buffer so it doesn't need to be perfectly at the top.
    const offset = typeof window !== "undefined" ? window.innerHeight / 4 : 300;
    const y = windowScroll.y + offset;

    useEffect(() => {
        const refs = [me, projects, contributions];

        let newActive: number = 0;

        for (const [index, ref] of refs.reverse().entries()) {
            if (!ref) continue;
            if (y > ref.boundingClientRect.y) {
                newActive = refs.length - 1 - index;
                break;
            }
        }

        if (active !== newActive) {
            setPrevious(active);
            setActive(newActive);
        }
    }, [y, me, projects, contributions]);

    return (
        <NavContainer>
            <Hex />
            <AnimatePresence>
                {!isWiderThan600px && (
                    <Sections initial="start" animate="complete" exit="start" variants={fadeDown}>
                        <Section
                            name="me"
                            index={0}
                            active={active}
                            previous={previous}
                            current={me}
                        />
                        <Section
                            name="projects"
                            index={1}
                            active={active}
                            previous={previous}
                            current={projects}
                        />
                        <Section
                            name="contributions"
                            index={2}
                            active={active}
                            previous={previous}
                            current={contributions}
                        />
                    </Sections>
                )}
            </AnimatePresence>
        </NavContainer>
    );
}

const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    height: 80px;
    padding: 0 2%;
    z-index: 2;
    transition: ease all 0.2s;
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid ${theme.accent.background};
`;

const Sections = styled(motion.ul)`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px 0;
`;
