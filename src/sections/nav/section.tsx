import { pop, fade, spring, fadeChildren, lightPop, extraLightPop } from "commons/animations";

import { Box, chakra, Heading } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import styled from "styled-components";

interface SectionProps {
    name: string;
    index: number;
    active: number;
    current?: IntersectionObserverEntry;
}

export default function Section({ name, index, active, current }: SectionProps): JSX.Element {
    const onTap = () => {
        if (!current) return;
        current.target.scrollIntoView();
    };

    return (
        <Box
            as={motion.li}
            id={`nav-section-${name}`}
            variants={fadeChildren}
            display="inline-block"
            position="relative"
            whiteSpace="nowrap"
            transition="ease all 0.15s"
            userSelect="none"
        >
            <Heading
                className="nav-section-name"
                as={motion.h3}
                fontSize="2xl"
                fontWeight={300}
                marginY={1}
                variants={fade}
                cursor="pointer"
                onTap={onTap}
                textTransform="uppercase"
                transform="translateY(var(--chakra-translate-y, 0))!important"
                willChange="transform"
                transitionProperty="transform"
                transitionDuration="slow"
                _hover={extraLightPop}
            >
                {name}
            </Heading>
            <Box as={motion.div} variants={fade}>
                <Box
                    as={motion.div}
                    height={1}
                    width="100%"
                    borderRadius="4px"
                    zIndex={-1}
                    background="background.secondary"
                >
                    {active === index && <HighlightedSectionBar />}
                </Box>
            </Box>
        </Box>
    );
}

const MotionBox = chakra(motion.div, {
    /**
     * Allow motion props and the children prop to be forwarded.
     * All other chakra props not matching the motion props will still be forwarded.
     */
    shouldForwardProp: prop => isValidMotionProp(prop) || prop === "children",
});

const HighlightedSectionBar = () => (
    <MotionBox
        as={motion.div}
        position="absolute"
        height={1}
        width="100%"
        borderRadius="4px"
        zIndex={2}
        background="brand.primary"
        layoutId="underline"
        // @ts-ignore no problem in operation, although type error appears.
        transition={spring}
    ></MotionBox>
);
