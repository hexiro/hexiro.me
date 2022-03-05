import { useEffect, useState } from "react";

import { fadeDown } from "commons/animations";
import theme from "commons/theme";
import Hex from "sections/nav/hex";
import Section from "sections/nav/section";

import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useMedia } from "react-use";
import styled, { css } from "styled-components";

interface NavProps {
    me?: IntersectionObserverEntry;
    projects?: IntersectionObserverEntry;
    contributions?: IntersectionObserverEntry;
    meInView: boolean;
    projectsInView: boolean;
    contributionsInView: boolean;
}

export default function Nav({
    me,
    projects,
    contributions,
    meInView,
    projectsInView,
    contributionsInView,
}: NavProps): JSX.Element {
    const [active, setActive] = useState(0);
    const isWiderThan600px = useMedia("(max-width: 600px)");

    useEffect(() => {
        const sectionsInView = [meInView, projectsInView, contributionsInView];

        let newActive = 0;

        for (const [index, inView] of sectionsInView.reverse().entries()) {
            if (inView) {
                newActive = sectionsInView.length - 1 - index;
                break;
            }
        }

        if (active !== newActive) {
            setActive(newActive);
        }

        // if active was in the deps list it would rerender forever
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meInView, projectsInView, contributionsInView]);

    return (
        <NavContainer background={projectsInView || !meInView}>
            <Hex />
            <AnimatePresence>
                {!isWiderThan600px && (
                    <AnimateSharedLayout>
                        <Sections
                            initial="start"
                            animate="complete"
                            exit="start"
                            variants={fadeDown}
                        >
                            <Section name="me" index={0} active={active} current={me} />
                            <Section name="projects" index={1} active={active} current={projects} />
                            <Section
                                name="contributions"
                                index={2}
                                active={active}
                                current={contributions}
                            />
                        </Sections>
                    </AnimateSharedLayout>
                )}
            </AnimatePresence>
        </NavContainer>
    );
}

interface NavContainerProps {
    background: boolean;
}

const NavContainer = styled.nav<NavContainerProps>`
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    height: 80px;
    padding: 0 2%;
    z-index: 2;
    background-color: transparent;
    border-bottom: 1px solid transparent;
    transition: ease all 0.225s;
    ${({ background }) => {
        if (!background) return;
        return css`
            backdrop-filter: blur(2px);
            background-color: rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid ${theme.accent.background};
        `;
    }}
`;

const Sections = styled(motion.ul)`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px 0;
`;
