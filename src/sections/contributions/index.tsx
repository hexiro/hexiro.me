import type { Flex } from "@chakra-ui/react";
import { Box, forwardRef } from "@chakra-ui/react";

import type { PullRequestProps } from "commons/graphql";
import RepositoryContainer from "components/RepositoryContainer";
import RepositorySection from "components/RepositorySection";
import RepositorySectionText from "components/RepositorySectionText";
import Repository from "components/repository";

interface ContributionsProps {
    pullRequests: PullRequestProps[];
}

export const Contributions = forwardRef<ContributionsProps, typeof Flex>(
    ({ pullRequests }, ref) => (
        <RepositorySection ref={ref} id="contributions">
            <RepositorySectionText
                title="Contributions"
                description="These pull requests are my top 6 GitHub pull requests. They're sorted by
                additions and deletions to showcase where my changes had a meaningful impact on the
                project."
                onRight
            />
            <RepositoryContainer>
                {pullRequests.map(pullRequest => (
                    <Repository
                        key={pullRequest.baseRepository.name}
                        details={pullRequest.baseRepository}
                    >
                        <Box
                            as="span"
                            display="inline"
                            color="brand.primary"
                            marginX={1}
                        >{`+${pullRequest.additions}`}</Box>
                        <Box
                            as="span"
                            display="inline"
                            color="red.400"
                            marginLeft={1}
                            marginRight={2}
                        >{`-${pullRequest.deletions}`}</Box>
                    </Repository>
                ))}
            </RepositoryContainer>
        </RepositorySection>
    )
);
