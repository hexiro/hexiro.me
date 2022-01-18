import { forwardRef } from "react";

import type { RepositoryProps } from "commons/graphql";
import { Header } from "components/common";
import Repository from "components/repository";

import styled from "styled-components";

interface ContributionsProps {
    contributions: RepositoryProps[];
}

export const Contributions = forwardRef<HTMLElement, ContributionsProps>(
    ({ contributions }, ref) => (
        <ProjectsSection ref={ref} id="contributions">
            <Text>
                <h1>
                    <Header>Projects</Header>
                </h1>
                <p>
                    Each project is hand-picked to best showcase my skills and creativity and can be
                    found on Github under my top six pinned repositories.
                </p>
            </Text>
            <ProjectsContainer>
                {contributions.map(contribution => (
                    <Repository key={contribution.name} {...contribution} />
                ))}
            </ProjectsContainer>
        </ProjectsSection>
    )
);

// temporaily borrowing styles from projects page

const Text = styled.div`
    text-align: right;
    margin: 12.5px;

    & p {
        float: right;
        max-width: 700px;
    }
`;
const ProjectsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
`;

const ProjectsSection = styled.section`
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 900px) {
        justify-content: center;
        margin-left: unset;

        ${Text} {
            text-align: center;
            float: unset;
        }
        ${ProjectsContainer} {
            justify-content: center;
        }
    }
`;
