import { fade, fadeChildren } from "commons/animations";
import type { RepositoryProps } from "commons/graphql";
import RepositoryContainer from "components/RepositoryContainer";
import RepositorySection from "components/RepositorySection";
import RepositorySectionText from "components/RepositorySectionText";
import Repository from "components/repository";
import { useScrollAnimation } from "hooks/useScrollAnimation";

import { Box, Flex, FlexProps, forwardRef, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ProjectsProps {
    repositories: RepositoryProps[];
}

export const Projects = forwardRef<ProjectsProps, typeof Flex>(({ repositories, inView }, ref) => {
    return (
        <RepositorySection ref={ref} id="projects">
            <RepositorySectionText
                title="Projects"
                description="These projects are my top 6 pinned repositories on GitHub. I specifically
                    hand-picked each repository as they nicely display my skill set and creativity."
            />
            <RepositoryContainer>
                {repositories.map(repo => (
                    <Repository key={repo.name} details={repo} />
                ))}
            </RepositoryContainer>
        </RepositorySection>
    );
});
