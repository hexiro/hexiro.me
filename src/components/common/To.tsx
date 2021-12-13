import Link from "next/link";
import { PropsWithChildren } from "react";

import theme from "commons/theme";

import styled from "styled-components";

type ToProps = PropsWithChildren<{ href: string; newTab?: boolean }>;

export const To = ({ href, newTab, children }: ToProps) => (
    <Link href={href} passHref>
        <Anchor rel="norefferer" target={newTab ? "_blank" : "_self"}>
            {children}
        </Anchor>
    </Link>
);

const Anchor = styled.a`
    color: ${theme.core.main};
    text-decoration: none;
    opacity: 0.85;
    font-weight: 300;
    transition: ease all 0.2s;
    &:hover {
        opacity: 1;
    }
    &:focus {
        filter: none;
    }
`;
