
import styled from "styled-components";
import React from "react";

export const Me = React.forwardRef<HTMLDivElement>((_, ref) => <TempMe id="me" ref={ref} />)

const TempMe = styled.div`
    height: 20px;
    width: 100vw;
    background: red;
    margin-top: 200px;
    margin: 200px 200px 200px 0;
`;
