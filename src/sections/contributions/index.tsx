import { forwardRef } from "react";

import { Repository } from "commons/graphql";
import Project from "sections/projects/project";

import styled from "styled-components";

interface ContributionsProps {
    contributions: Repository[];
}

export const Contributions = forwardRef<HTMLElement, ContributionsProps>(
    ({ contributions }, ref) => (
        <ContribtionsSection ref={ref} id="contributions">
            {contributions.map(contribution => (
                <Project key={contribution.name} {...contribution} />
            ))}
        </ContribtionsSection>
    )
);

const ContribtionsSection = styled.section`
    width: 100%;
`;
