import type { MutableRefObject } from "react";
import { useEffect, useState } from "react";

import { fade, fadeDown } from "commons/animations";
import theme from "commons/theme";
import Hex from "sections/nav/hex";
import Section from "sections/nav/section";

import { AnimatePresence, motion } from "framer-motion";
import { useMedia, useWindowScroll } from "react-use";
import styled from "styled-components";

interface NavProps {
    meRef: MutableRefObject<HTMLElement | null>;
    projectsRef: MutableRefObject<HTMLElement | null>;
    contributionsRef: MutableRefObject<HTMLElement | null>;
}

export default function Nav({ meRef, projectsRef, contributionsRef }: NavProps): JSX.Element {
    // active section
    const [active, setActive] = useState(0);
    // previously active section
    const [previous, setPrevious] = useState(0);
    // window y position
    const windowScroll = useWindowScroll();
    const isWiderThan600px = useMedia("(max-width: 600px)");

    console.log(isWiderThan600px);

    // add 1/4 of page's height to y as a buffer so it doesn't need to be perfectly at the top.
    const offset = typeof window !== "undefined" ? window.innerHeight / 4 : 300;
    const y = windowScroll.y + offset;

    useEffect(() => {
        const refs = [meRef, projectsRef, contributionsRef];

        let newActive: number = 0;

        for (const [index, ref] of refs.reverse().entries()) {
            if (!ref?.current) continue;
            if (y > ref.current.offsetTop) {
                newActive = refs.length - 1 - index;
                break;
            }
        }

        if (active !== newActive) {
            setPrevious(active);
            setActive(newActive);
        }
    }, [y, meRef, projectsRef, contributionsRef]);

    return (
        <NavContainer>
            <Hex />
            <AnimatePresence>
                {!isWiderThan600px && (
                    <Sections initial="fading" animate="faded" exit="fading" variants={fadeDown}>
                        <Section
                            name="me"
                            index={0}
                            active={active}
                            previous={previous}
                            sectionRef={meRef}
                        />
                        <Section
                            name="projects"
                            index={1}
                            active={active}
                            previous={previous}
                            sectionRef={projectsRef}
                        />
                        <Section
                            name="contributions"
                            index={2}
                            active={active}
                            previous={previous}
                            sectionRef={contributionsRef}
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
