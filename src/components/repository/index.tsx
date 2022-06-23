import type { PropsWithChildren } from "react";

import { Box, Flex, Heading, HStack, LinkBox, Text } from "@chakra-ui/react";

import { lightPop } from "commons/animations";
import { GITHUB } from "commons/config";
import type { RepositoryProps } from "commons/graphql";
import { ParseHTML, LinkOverlay } from "components/common";
import { Forks, Stars } from "components/repository/details";
import Language from "components/repository/language";

type ProjectProps = PropsWithChildren<{
    details: RepositoryProps;
}>;

export default function Repository({ children, details }: ProjectProps): JSX.Element {
    return (
        <LinkBox
            className="repository"
            position="relative"
            paddingX={5}
            paddingY={3}
            height="200px"
            borderRadius="lg"
            background="background.secondary"
            boxShadow="md"
            transform="auto"
            transitionProperty="transform"
            transitionDuration="fast"
            willChange="transform"
            wordBreak="break-word"
            cursor="pointer"
            width="100%"
            _hover={lightPop}
        >
            <Box>
                <Flex as="header" className="repository-header" align="center" paddingBottom={1}>
                    <Heading
                        className="repository-name"
                        as="h3"
                        size="md"
                        fontWeight={300}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        <LinkOverlay href={details.url}>
                            {details.owner.login !== GITHUB && (
                                <Box as="span" display={{ base: "none", sm: "none", md: "revert" }}>
                                    {details.owner.login}/
                                </Box>
                            )}
                            <Box as="span">{details.name}</Box>
                        </LinkOverlay>
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
                <Text paddingBottom={4}>
                    <ParseHTML html={details.descriptionHTML} />
                </Text>
                <Flex
                    as="footer"
                    className="repository-footer"
                    align="center"
                    position="absolute"
                    bottom={3}
                >
                    <Language name={details.primaryLanguage.name} />
                    <Box as="span" marginLeft={2}>
                        {details.primaryLanguage.name}
                    </Box>
                    {children}
                </Flex>
            </Box>
        </LinkBox>
    );
}

// box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25);
