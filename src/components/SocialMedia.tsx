import { SocialMediaProps } from "types";

import { To } from "components";

import styled from "styled-components";

export const SocialMedia = ({ href, children }: SocialMediaProps): JSX.Element => {
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
