import { fade, fadeChildren } from "commons/animations";
import type { RepositoryProps } from "commons/graphql";
import RepositoryContainer from "components/RepositoryContainer";
import Repository from "components/repository";
import { useScrollAnimation } from "hooks/useScrollAnimation";
import type { SectionProps } from "sections";

import { Box, Flex, FlexProps, forwardRef, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ProjectsProps extends SectionProps {
    repositories: RepositoryProps[];
}

export const Projects = forwardRef<ProjectsProps, typeof Flex>(({ repositories, inView }, ref) => {
    const animate = useScrollAnimation(inView);
    return (
        <Flex
            ref={ref}
            as={motion.section}
            id="projects"
            animate={animate}
            initial="start"
            variants={fadeChildren}
            position="relative"
            width="100%"
            direction="column"
            justify={{ base: "center", xl: "revert" }}
        >
            <Box
                as={motion.div}
                id="projects-text"
                variants={fade}
                maxWidth="900px"
                textAlign={{ base: "center", lg: "left" }}
                margin={{ base: "unset", lg: "0 15% 0 1%" }}
            >
                <Heading as="h1">Projects</Heading>
                <Text
                    maxWidth={{ base: "unset", lg: "revert" }}
                    margin={{ base: "0 5%", lg: "revert" }}
                >
                    These projects are my top 6 pinned repositories on GitHub. I specifically
                    hand-picked each repository as they nicely display my skill set and creativity.
                </Text>
            </Box>
            <RepositoryContainer>
                {repositories.map(repo => (
                    <Repository key={repo.name} details={repo} />
                ))}
            </RepositoryContainer>
        </Flex>
    );
});
