import type { PropsWithChildren } from "react";

import { Box, Flex, Heading, HStack, LinkBox, Text } from "@chakra-ui/react";

import { lightPop } from "commons/animations";
import { GITHUB } from "commons/config";
import type { Project } from "commons/graphql/projects";
import LanguageBadge from "components/LanguageBadge";
import { ParseHTML, LinkOverlay } from "components/common";
import { Forks, Stars } from "components/repository/details";

interface ProjectProps {
    details: Project;
}

export default function Repository({
    details,
    children,
}: PropsWithChildren<ProjectProps>): JSX.Element {
    return (
        <LinkBox
            className="repository"
            position="relative"
            paddingX={5}
            paddingY={3}
            height={48}
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
            border="1px"
            borderColor="background.lightened"
            _hover={lightPop}
        >
            <Box>
                <Flex as="header" className="repository-header" align="center" paddingBottom={0.5}>
                    <Heading
                        className="repository-name"
                        as="h3"
                        size="md"
                        fontWeight={300}
                        lineHeight="unset"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        <LinkOverlay href={details.url}>
                            {details.ownerName !== GITHUB && (
                                <Box as="span" display={{ base: "none", md: "revert" }}>
                                    {details.ownerName}/
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
                            <Stars stargazers={details.totalStars} />
                            <Forks forks={details.totalForks} />
                        </HStack>
                    </Flex>
                </Flex>
                <Flex className="repository-badges" paddingBottom={1} gap={2} wrap="wrap">
                    {details.languages.map(language => (
                        <LanguageBadge key={language} name={language} />
                    ))}
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
                    {children}
                </Flex>
            </Box>
        </LinkBox>
    );
}
