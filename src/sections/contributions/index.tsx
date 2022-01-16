import { forwardRef } from "react";

import styled from "styled-components";

export const Contributions = forwardRef<HTMLElement>((_, ref) => (
    <ContribtionsSection ref={ref} id="contributions"></ContribtionsSection>
));

const ContribtionsSection = styled.section`
    background: wheat;
    padding-bottom: 1000px;
    width: 100%;
`;
