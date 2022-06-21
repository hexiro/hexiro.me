import { useEffect, useState } from "react";

import { fadeDown } from "commons/animations";
import usePassedScrollPosition from "hooks/useScrollPosition";
import Hex from "sections/nav/hex";
import Section from "sections/nav/section";

import { Flex, Hide, HStack } from "@chakra-ui/react";
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
    const scrolled = usePassedScrollPosition({ pixels: 100, defaultValue: false });

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
        <Flex
            as="nav"
            position="fixed"
            top={0}
            left={0}
            width="100%"
            height={20}
            paddingX="2%"
            zIndex={9999}
            backdropFilter="auto"
            backgroundColor="transparent"
            borderBottom="1px solid"
            borderBottomColor="transparent"
            transitionDuration="225ms"
            transitionProperty="background-color, border-color"
            sx={
                scrolled
                    ? {
                          backdropBlur: "2px",
                          backgroundColor: "blackAlpha.400",
                          borderBottomColor: "background.secondary",
                      }
                    : undefined
            }
        >
            <Hex />
            <AnimatePresence>
                <Hide below="md">
                    <HStack
                        as={motion.div}
                        className="nav-sections"
                        initial="start"
                        animate="complete"
                        exit="start"
                        variants={fadeDown}
                        justify="flex-end"
                        width="100%"
                        // paddingY="20px"
                        spacing={10}
                    >
                        <Section name="me" index={0} active={active} current={me} />
                        <Section name="projects" index={1} active={active} current={projects} />
                        <Section
                            name="contributions"
                            index={2}
                            active={active}
                            current={contributions}
                        />
                    </HStack>
                </Hide>
            </AnimatePresence>
        </Flex>
    );
}
