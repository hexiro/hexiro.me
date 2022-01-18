import { forwardRef } from "react";

import { RepositoryProps } from "commons/graphql";
import Repository from "components/repository";

import styled from "styled-components";

interface ContributionsProps {
    contributions: RepositoryProps[];
}

export const Contributions = forwardRef<HTMLElement, ContributionsProps>(
    ({ contributions }, ref) => (
        <ContribtionsSection ref={ref} id="contributions">
            {contributions.map(contribution => (
                <Repository key={contribution.name} {...contribution} />
            ))}
        </ContribtionsSection>
    )
);

const ContribtionsSection = styled.section`
    width: 100%;
`;
