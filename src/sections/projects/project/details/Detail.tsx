import { PropsWithChildren } from "react";

import styled from "styled-components";

type DetailProps = PropsWithChildren<{ detail: number }>;

export default function Detail({ detail, children }: DetailProps): JSX.Element | null {
    if (detail <= 0) return null;
    return (
        <ProjectDetail>
            {children}
            <h4>{detail}</h4>
        </ProjectDetail>
    );
}

const ProjectDetail = styled.li`
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    & h4 {
        margin-left: 2px;
    }
`;
