import { PropsWithChildren } from "react";

import { To } from "components/common";

import styled from "styled-components";

export const SocialMedia = ({ href, children }: PropsWithChildren<{ href: string }>) => {
    return (
        <SocialItem>
            <To href={href}>{children}</To>
        </SocialItem>
    );
};

const SocialItem = styled.li`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
`;
