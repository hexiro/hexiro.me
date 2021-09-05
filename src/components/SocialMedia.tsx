import Link from "next/link";

import { SocialMediaProps } from "types";

import styled from "styled-components";

export const SocialMedia = ({ href, children }: SocialMediaProps): JSX.Element => {
    return (
        <SocialItem>
            <Link href={href}>
                <a rel="noreferrer" target="_blank">
                    {children}
                </a>
            </Link>
        </SocialItem>
    );
};

const SocialItem = styled.li`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
`;
