import { PropsWithChildren } from "react";

import styled from "styled-components";

type DetailProps = PropsWithChildren<{ detail: number }>;

export default function Detail({ detail, children }: DetailProps): JSX.Element | null {
    if (detail <= 0) return null;
    return (
        <ProjectDetail>
            {children}
            <DetailNumber>{detail}</DetailNumber>
        </ProjectDetail>
    );
}

const DetailNumber = styled.h4`
    margin-left: 2px;
    line-height: 33px;
`;

const ProjectDetail = styled.li`
    display: inline-flex;
    align-items: center;
    margin-right: 10px;

    & svg {
        height: 18px;
        width: 18px;
    }
`;
