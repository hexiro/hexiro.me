import Link from "next/link";
import type { PropsWithChildren } from "react";

import theme from "commons/theme";
import { Header } from "components/common";

import styled from "styled-components";

type ToProps = PropsWithChildren<{ href: string }>;

export const To = ({ href, children }: ToProps) => (
    <Link passHref href={href}>
        <Anchor rel="norefferer" target="_blank">
            <Header pop pointer popShift={2}>
                {children}
            </Header>
        </Anchor>
    </Link>
);

const Anchor = styled.a`
    color: ${theme.core.main};
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
