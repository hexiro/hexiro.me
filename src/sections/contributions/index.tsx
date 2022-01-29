import { forwardRef, useEffect } from "react";

import { fade, fadeChildren } from "commons/animations";
import type { PullRequestProps } from "commons/graphql";
import theme from "commons/theme";
import { Header } from "components/common";
import Repository from "components/repository";
import { useScrollAnimation } from "hooks/useScrollAnimation";
import { SectionProps } from "sections";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import styled from "styled-components";

interface ContributionsProps extends SectionProps {
    pullRequests: PullRequestProps[];
}

export const Contributions = forwardRef<HTMLElement, ContributionsProps>(
    ({ pullRequests, inView }, ref) => {
        const animate = useScrollAnimation(inView);
        return (
            <ContributionsSection
                ref={ref}
                id="contributions"
                animate={animate}
                initial="start"
                variants={fadeChildren}
            >
                <Text variants={fade}>
                    <h1>
                        <Header>Contributions</Header>
                    </h1>
                    <p>My top contribution pull requests sorted by additions and deletions.</p>
                </Text>
                <ContributionsContainer variants={fadeChildren}>
                    {pullRequests.map(pullRequest => (
                        <Repository
                            key={pullRequest.baseRepository.name}
                            details={pullRequest.baseRepository}
                            whileHover={{ translateY: -3 }}
                            variants={fade}
                        >
                            <Additions>{`+${pullRequest.additions}`}</Additions>
                            <Deletions>{`-${pullRequest.deletions}`}</Deletions>
                        </Repository>
                    ))}
                </ContributionsContainer>
            </ContributionsSection>
        );
    }
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

const Text = styled(motion.div)`
    text-align: right;
    margin: 12.5px;

    & p {
        float: right;
        max-width: 700px;
    }
`;
const ContributionsContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
`;

const ContributionsSection = styled(motion.section)`
    position: relative;
    width: 100%;
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
