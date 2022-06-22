import { useEffect, useState } from "react";

import usePassedScrollPosition from "hooks/useScrollPosition";
import Hex from "sections/nav/hex";
import Section from "sections/nav/section";

import { Flex, Hide, HStack } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

interface NavProps {
    sections: Record<
        string,
        {
            inView: boolean;
            current: IntersectionObserverEntry | undefined;
        }
    >;
}

export default function Nav({ sections }: NavProps): JSX.Element {
    const [active, setActive] = useState(0);
    const scrolled = usePassedScrollPosition({ pixels: 50, defaultValue: false });

    useEffect(() => {
        const sectionsInView = Object.values(sections).map(({ inView }) => inView);

        setActive(() => {
            const active = sectionsInView.findIndex(inView => inView);
            if (active === -1) return 0;
            return active;
        });
    }, [sections]);

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
                    <HStack className="nav-sections" justify="flex-end" width="100%" spacing={10}>
                        {Object.entries(sections).map(([name, { inView, current }], index) => (
                            <Section key={name} name={name} current={current} highlight={index === active} />
                        ))}
                    </HStack>
                </Hide>
            </AnimatePresence>
        </Flex>
    );
}
