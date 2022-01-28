import { forwardRef } from "react";

import type { PullRequestProps } from "commons/graphql";
import theme from "commons/theme";
import { Header } from "components/common";
import Repository from "components/repository";
import { SectionProps } from "sections";

import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

interface ContributionsProps extends SectionProps {
    pullRequests: PullRequestProps[];
}

export const Contributions = forwardRef<HTMLElement, ContributionsProps>(
    ({ pullRequests, inView }, ref) => (
        <AnimatePresence>
            {inView && (
                <ContributionsSection ref={ref} id="contributions">
                    <Text>
                        <h1>
                            <Header>Contributions</Header>
                        </h1>
                        <p>My top contribution pull requests sorted by additions and deletions.</p>
                    </Text>
                    <ContributionsContainer>
                        {pullRequests.map(pullRequest => (
                            <Repository
                                key={pullRequest.baseRepository.name}
                                {...pullRequest.baseRepository}
                            >
                                <Additions>{`+${pullRequest.additions}`}</Additions>
                                <Deletions>{`-${pullRequest.deletions}`}</Deletions>
                            </Repository>
                        ))}
                    </ContributionsContainer>
                </ContributionsSection>
            )}
        </AnimatePresence>
    )
);

// temporaily borrowing styles from projects page

const Additions = styled.span`
    display: inline;
    color: ${theme.core.main};
    margin: 0 3px;
`;

const Deletions = styled(Additions)`
    color: #ff5858;
    margin-right: 10px;
`;

const Text = styled.div`
    text-align: right;
    margin: 12.5px;

    & p {
        float: right;
        max-width: 700px;
    }
`;
const ContributionsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
`;

const ContributionsSection = styled.section`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    padding-right: 4%;

    @media only screen and (max-width: 900px) {
        justify-content: center;
        padding-right: unset;

        ${Text} {
            text-align: center;
            float: unset;
        }
        ${ContributionsContainer} {
            justify-content: center;
        }
    }
`;
