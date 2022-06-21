import Image from "next/image";
import { PropsWithChildren } from "react";

import { fade, fadeChildren, pop } from "commons/animations";
import { GITHUB } from "commons/config";
import { useScrollAnimation } from "hooks/useScrollAnimation";
import type { SectionProps } from "sections";
import SocialMedia from "sections/me/socials";

import { Box, Flex, FlexProps, forwardRef, Heading, Hide, HStack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMedia } from "react-use";

interface MeProps extends SectionProps {
    description: string;
}

export const Me = forwardRef<MeProps, typeof Flex>(({ inView, description }, ref) => {
    const animate = useScrollAnimation(inView);
    const shouldAvatarFadeOut = useMedia("(max-width: 600px)", false);

    return (
        <Flex
            ref={ref}
            id="me"
            as={motion.section}
            initial="start"
            animate={animate}
            exit="start"
            variants={fadeChildren}
            position="relative"
            width="100%"
            align="center"
            minHeight={{ base: "unset", md: "750px" }}
            direction={{ base: "column-reverse", xl: "row" }}
            justify={{ base: "flex-end", xl: "center" }}
        >
            <Flex
                className="me-left"
                as={motion.div}
                variants={fadeChildren}
                align="center"
                maxWidth="500px"
                paddingRight={{ base: 0, xl: 5 }}
                display={{ base: "flex", xl: "revert" }}
                direction={{ base: "column", xl: "row" }}
                justify={{ base: "center", xl: "revert" }}
                textAlign={{ base: "center", xl: "revert" }}
                marginTop={{ base: "20px", xl: "revert" }}
                width={{ base: "100%", xl: "75%" }}
                flexBasis="50%"
            >
                <Heading
                    as={motion.h1}
                    variants={fade}
                    color="brand.text"
                    fontWeight={300}
                    whiteSpace="nowrap"
                >
                    Hi! I&apos;m{" "}
                    <Box
                        as="span"
                        transform="auto"
                        willChange="transform"
                        _hover={pop}
                        color="brand.primary"
                        fontWeight={400}
                    >
                        Hexiro
                    </Box>
                    ,
                </Heading>
                <Text as={motion.p} variants={fade} minWidth="200px" marginBottom="20px">
                    {description}
                </Text>
                <Box as={motion.ul} variants={fadeChildren} whiteSpace="nowrap">
                    <SocialMedia type="Twitter" />
                    <SocialMedia type="GitHub" />
                    <SocialMedia type="Steam" />
                </Box>
                {/* <Lanyard /> */}
            </Flex>
            <Box
                className="me-right"
                as={motion.div}
                variants={fadeChildren}
                paddingLeft={{ base: 0, xl: 5 }}
                flexBasis="50%"
            >
                <AnimatePresence>
                    <Box
                        as={motion.div}
                        initial="start"
                        animate="complete"
                        exit="start"
                        variants={fade}
                        sx={{
                            "& > span": {
                                filter: "auto",
                                dropShadow: "0px 0px 12px rgba(0, 0, 0, 0.25)",
                            },
                            "& > span img": {
                                borderRadius: "12%",
                                maxWidth: { base: "350px", xl: "400px" },
                                maxHeight: { base: "350px", xl: "400px" },
                            },
                        }}
                    >
                        <Image
                            priority
                            src={`https://avatars.githubusercontent.com/${GITHUB}`}
                            alt="Hexiro Avatar"
                            height={500}
                            width={500}
                            quality={100}
                            draggable={false}
                        />
                    </Box>
                </AnimatePresence>
            </Box>
        </Flex>
    );
});
