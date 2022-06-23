import { Box, chakra, Heading } from "@chakra-ui/react";

import { spring, extraLightPop, lightTap } from "commons/animations";
import { isValidMotionProp, motion } from "framer-motion";

interface SectionProps {
    name: string;
    highlight: boolean;
    current?: IntersectionObserverEntry;
}

export default function Section({ name, highlight, current }: SectionProps): JSX.Element {
    const onTap = () => {
        if (!current) return;
        current.target.scrollIntoView();
    };

    return (
        <Box
            id={`nav-section-${name}`}
            display="inline-block"
            position="relative"
            whiteSpace="nowrap"
            transition="ease all 0.15s"
            userSelect="none"
        >
            <Heading
                className="nav-section-name"
                fontSize="2xl"
                fontWeight={300}
                marginY={1}
                cursor="pointer"
                textTransform="uppercase"
                transform="auto"
                willChange="transform"
                transitionProperty="transform"
                transitionDuration="fast"
                _hover={extraLightPop}
                _active={lightTap}
                onClick={onTap}
            >
                {name}
            </Heading>
            <Box
                height={1}
                width="100%"
                borderRadius="4px"
                zIndex={-1}
                background="background.secondary"
            >
                {highlight && <HighlightedSectionBar />}
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
        // @ts-expect-error no problem in operation, although type error appears.
        transition={spring}
    />
);
