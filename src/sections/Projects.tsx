import React from "react";

import styled from "styled-components";


export const Projects = React.forwardRef<HTMLDivElement>((_, ref) => (
    <TempProjects id="projects" ref={ref} />
));

const TempProjects = styled.div`
    height: 20px;
    width: 100vw;
    background: wheat;
    margin: 700px 200px 2000px 0;
`;
