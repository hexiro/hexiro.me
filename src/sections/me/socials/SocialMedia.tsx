import { PropsWithChildren } from "react";

import { Header, To } from "components/common";

import styled from "styled-components";

export const SocialMedia = ({ href, children }: PropsWithChildren<{ href: string }>) => (
    <Header pop pointer>
        <SocialItem>
            <To href={href}>{children}</To>
        </SocialItem>
    </Header>
);

const SocialItem = styled.li`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
`;
