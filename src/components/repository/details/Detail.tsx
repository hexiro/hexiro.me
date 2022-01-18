import type { PropsWithChildren } from "react";

import styled from "styled-components";

type DetailProps = PropsWithChildren<{ count: number }>;

export default function Detail({ count, children }: DetailProps): JSX.Element | null {
    if (count <= 0) return null;
    let detail: string | number;
    if (count >= 1000 && count < 10000) {
        // format. ex. (4990 > '4.9k')
        detail = `${Math.floor((count / 1000) * 10) / 10}k`;
    } else {
        detail = count;
    }

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
