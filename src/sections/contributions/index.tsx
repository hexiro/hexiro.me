import type { Flex } from "@chakra-ui/react";
import { forwardRef, Text, HStack } from "@chakra-ui/react";

import type { ProjectWithContribution } from "commons/graphql/contributions";
import RepositoryContainer from "components/repository/RepositoryContainer";
import RepositorySection from "components/repository/RepositorySection";
import RepositorySectionText from "components/repository/RepositorySectionText";
import Repository from "components/repository";

interface ContributionsProps {
    projectsWithContribution: ProjectWithContribution[];
}

export const Contributions = forwardRef<ContributionsProps, typeof Flex>(
    ({ projectsWithContribution }, ref) => (
        <RepositorySection ref={ref} id="contributions">
            <RepositorySectionText
                title="Contributions"
                description="These pull requests are my top 6 GitHub pull requests. They're sorted by
                additions and deletions to showcase where my changes had a meaningful impact on the
                project."
                onRight
            />
            <RepositoryContainer>
                {projectsWithContribution.map(projectWithContribution => (
                    <Repository
                        key={projectWithContribution.name}
                        details={projectWithContribution}
                    >
                        <HStack spacing={2}>
                            <Text
                                fontSize="sm"
                                color="brand.primary"
                            >{`+${projectWithContribution.additions}`}</Text>
                            <Text
                                fontSize="sm"
                                color="red.400"
                            >{`-${projectWithContribution.deletions}`}</Text>
                        </HStack>
                    </Repository>
                ))}
            </RepositoryContainer>
        </RepositorySection>
    )
);
