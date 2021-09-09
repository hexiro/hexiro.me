import Link from "next/link";

import theme from "static/theme";

import styled from "styled-components";
import { PropsWithChildren } from "react";

export const To = ({ href, children }: PropsWithChildren<{ href: string }>) => (
    <Link href={href} passHref>
        <Anchor rel="noreferrer" target="_blank">
            {children}
        </Anchor>
    </Link>
);

const Anchor = styled.a`
    color: ${theme.core.main};
    text-decoration: none;
    opacity: 0.7;
    font-weight: 300;
    transition: ease all 0.2s;
    &:hover {
        opacity: 0.9;
    }
`;
