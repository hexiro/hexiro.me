import { PropsWithChildren } from "hoist-non-react-statics/node_modules/@types/react";
import styled from "styled-components";

export default function Detail({ detail, children }: DetailProps): JSX.Element | null {
    if (detail > 0) {
        return (
            <ProjectDetail>
                {children}
                <h4>{detail}</h4>
            </ProjectDetail>
        );
    }
    return null;
}

type DetailProps = PropsWithChildren<{ detail: number }>;

const ProjectDetail = styled.li`
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
`;
