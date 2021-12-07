import React from "react";

import styled from "styled-components";

export const Projects = React.forwardRef<HTMLElement>((_, ref) => (
    <TempProjects id="projects" ref={ref} />
));

const TempProjects = styled.section`
    height: 20px;
    width: 100%;
    background: wheat;
    margin: 700px 50px;
`;
