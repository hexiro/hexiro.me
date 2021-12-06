import React from "react";
import { PropsWithChildren } from "react";

import styled from "styled-components";

type MeProps = PropsWithChildren<{}>;

export const Me = React.forwardRef<HTMLDivElement, MeProps>(({ children }, ref) => (
    <TempMe id="me" ref={ref}>
        {children}
    </TempMe>
));

const TempMe = styled.div`
    height: 20px;
    width: 100vw;
    background: red;
    margin-top: 200px;
    margin: 200px 200px 200px 0;
`;
