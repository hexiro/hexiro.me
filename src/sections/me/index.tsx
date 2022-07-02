import Image from "next/image";

import { Box, Flex, forwardRef, Heading, Text } from "@chakra-ui/react";

import { extraLightPop } from "commons/animations";
import { GITHUB } from "commons/config";
import { AnimatePresence } from "framer-motion";
import SocialMedia from "sections/me/socials";
import Status from "sections/me/status";

interface MeProps {
    description: string;
}

export const Me = forwardRef<MeProps, typeof Flex>(({ inView, description }, ref) => (
    <Flex
        ref={ref}
        id="me"
        as="section"
        position="relative"
        width="100%"
        align="center"
        direction={{ base: "column-reverse", xl: "row" }}
        justify={{ base: "center", xl: "space-between" }}
    >
        <Flex
            className="me-left"
            align="center"
            maxWidth="lg"
            paddingRight={{ base: 0, xl: 5 }}
            display={{ base: "flex", xl: "revert" }}
            direction={{ base: "column", xl: "row" }}
            justify={{ base: "center", xl: "revert" }}
            textAlign={{ base: "center", xl: "revert" }}
            marginTop={{ base: 5, xl: "revert" }}
            width={{ base: "100%", xl: "75%" }}
            flexBasis="50%"
        >
            <Heading color="brand.text" fontWeight={300} whiteSpace="nowrap">
                Hi! I&apos;m{" "}
                <Box
                    as="span"
                    display="inline-block"
                    color="brand.primary"
                    fontWeight={400}
                    transform="auto"
                    transitionProperty="transform"
                    transitionDuration="fast"
                    willChange="transform"
                    cursor="default"
                    _hover={extraLightPop}
                >
                    Hexiro
                </Box>
                ,
            </Heading>
            <Text minWidth={48} marginBottom={3}>
                {description}
            </Text>
            <Flex as="ul" whiteSpace="nowrap" align="center">
                <SocialMedia type="Twitter" />
                <SocialMedia type="GitHub" />
                <SocialMedia type="Discord" />
            </Flex>
            <Status />
        </Flex>
        <Box className="me-right" paddingLeft={{ base: 0, xl: 5 }} flexBasis="50%">
            <AnimatePresence>
                <Flex
                    justify="center"
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
                </Flex>
            </AnimatePresence>
        </Box>
    </Flex>
));
