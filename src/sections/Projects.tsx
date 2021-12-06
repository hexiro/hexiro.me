import React, { PropsWithChildren } from "react";

import styled from "styled-components";

type ProjectProps = PropsWithChildren<{}>;

export const Projects = React.forwardRef<HTMLDivElement, ProjectProps>(({ children }, ref) => (
    <TempProjects id="projects" ref={ref}>
        {children}
    </TempProjects>
));

const TempProjects = styled.div`
    height: 20px;
    width: 100vw;
    background: wheat;
    margin: 700px 200px 2000px 0;
`;
