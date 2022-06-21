import type { PropsWithChildren } from "react";

import { pop, fade, lightPop } from "commons/animations";
import { GITHUB } from "commons/config";
import type { RepositoryProps } from "commons/graphql";
import { ParseHTML, To } from "components/common";
import { Forks, Stars } from "components/repository/details";
import Language from "components/repository/language";

import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "styled-components";

type ProjectProps = PropsWithChildren<{
    details: RepositoryProps;
}>;

export default function Repository({ children, details }: ProjectProps): JSX.Element {
    return (
        <Box
            as={motion.div}
            variants={fade}
            className="repository"
            position="relative"
            paddingX="20px"
            paddingTop="10px"
            paddingBottom="4px"
            marginY="10px"
            marginX="1%"
            minWidth="310px"
            height="200px"
            borderRadius="lg"
            background="background.secondary"
            boxShadow="md"
            transform="translateY(var(--chakra-translate-y, 0))!important"
            willChange="transform"
            wordBreak="break-word"
            width={{ base: "85%", xl: "48%" }}
            _hover={{ translateY: -3 }}
        >
            <Box>
                <Flex as="header" className="repository-header" align="center">
                    <Heading
                        className="repository-name"
                        as="h3"
                        size="md"
                        fontWeight={300}
                        transform="auto"
                        _hover={lightPop}
                    >
                        <To href={details.url}>
                            {details.owner.login !== GITHUB && (
                                <Box as="span" display={{ base: "none", sm: "none", md: "revert" }}>
                                    {details.owner.login}/
                                </Box>
                            )}
                            <Box as="span">{details.name}</Box>
                        </To>
                    </Heading>
                    <Flex
                        className="repository-details"
                        align="center"
                        marginLeft="auto"
                        paddingLeft="4%"
                    >
                        <HStack spacing={2}>
                            <Stars stargazers={details.stargazers.totalCount} />
                            <Forks forks={details.forks.totalCount} />
                        </HStack>
                    </Flex>
                </Flex>
                <Text paddingBottom={2.5}>
                    <ParseHTML html={details.descriptionHTML} />
                </Text>
                <Flex
                    as="footer"
                    className="repository-footer"
                    align="center"
                    position="absolute"
                    bottom={2.5}
                >
                    <Language name={details.primaryLanguage.name} />
                    <Box as="span" marginRight={2.5}>
                        {details.primaryLanguage.name}
                    </Box>
                    {children}
                </Flex>
            </Box>
        </Box>
    );
}

// box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25);

// const Description = styled.p`
//     padding-bottom: 10px;
//     font-size: 1em;

//     @media only screen and (max-width: 450px) {
//         line-height: 1.4;
//     }
// `;

// const ProjectNav = styled.div`
//     display: flex;
//     align-items: center;
// `;

// const ProjectName = styled(motion.h3)`
//     display: inline-block;
//     will-change: transform;
//     max-width: 100%;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
// `;

// const Details = styled.div`
//     display: flex;
//     align-items: center;
//     flex-shrink: 0;

//     margin-left: auto;
//     padding-left: 4%;
// `;

// const Footer = styled.div`
//     display: flex;
//     align-items: center;
//     position: absolute;
//     bottom: 10px;

//     & > svg {
//         margin-right: 6px;
//     }
// `;

// const LanguageName = styled.span`
//     margin-right: 10px;
// `;
