import { To } from "components/common";

import styled from "styled-components";

export const SocialMedia = ({ href, children }: SocialMediaProps) => {
    return (
        <SocialItem>
            <To href={href}>{children}</To>
        </SocialItem>
    );
};

interface SocialMediaProps {
    href: string;
    children?: React.ReactNode;
}

const SocialItem = styled.li`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
`;
