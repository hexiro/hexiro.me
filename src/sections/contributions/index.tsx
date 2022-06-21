import { fade, fadeChildren } from "commons/animations";
import type { PullRequestProps } from "commons/graphql";
import RepositoryContainer from "components/RepositoryContainer";
import RepositorySection from "components/RepositorySection";
import RepositorySectionText from "components/RepositorySectionText";
import Repository from "components/repository";
import { useScrollAnimation } from "hooks/useScrollAnimation";

import { Box, forwardRef, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface ContributionsProps {
    pullRequests: PullRequestProps[];
}

export const Contributions = forwardRef<ContributionsProps, typeof Flex>(
    ({ pullRequests, inView }, ref) => {
        return (
            <RepositorySection ref={ref} id="contributions">
                <RepositorySectionText
                    onRight
                    title="Contributions"
                    description="These pull requests are my top 6 GitHub pull requests. They're sorted by
                additions and deletions to showcase where my changes had a meaningful impact on the
                project."
                ></RepositorySectionText>
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
                                marginRight="10px"
                            >{`-${pullRequest.deletions}`}</Box>
                        </Repository>
                    ))}
                </RepositoryContainer>
            </RepositorySection>
        );
    }
);

// temporarily borrowing styles from projects page

// const Additions = styled.span`
//     display: inline;
//     color: ${theme.core.main};
//     margin: 0 3px;
// `;

// const Deletions = styled(Additions)`
//     color: #ff5858;
//     margin-right: 10px;
// `;

// const Text = styled(motion.div)`
//     text-align: right;
//     margin-right: 1%;
//     margin-left: 15%;
//     max-width: 900px;
//     align-self: flex-end;

//     @media only screen and (max-width: 900px) {
//         text-align: center;
//         margin: unset;
//     }
// `;

// const Description = styled.p`
//     float: right;

//     @media only screen and (max-width: 900px) {
//         max-width: unset;
//         margin: 0 5%;
//         float: unset;
//     }
// `;

// const ContributionsContainer = styled(motion.div)`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: flex-end;

//     @media only screen and (max-width: 900px) {
//         justify-content: center;
//     }
// `;

// const ContributionsSection = styled(motion.section)`
//     position: relative;
//     width: 100%;
//     display: flex;
//     flex-direction: column;

//     @media only screen and (max-width: 900px) {
//         justify-content: center;
//     }
// `;
