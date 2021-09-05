import Link from "next/link";

import theme from "data/theme";

import styled from "styled-components";

export const To = ({ href, children }: ToProps) => (
    <Link href={href}>
        <Anchor rel="noreferrer" target="_blank">
            {children}
        </Anchor>
    </Link>
);

interface ToProps {
    href: string;
    children?: React.ReactNode;
}

const Anchor = styled.a`
    color: ${theme.core.main};
    text-decoration: none;
    opacity: 0.7;
    font-weight: 300;
    transition: all ease 0.2s;
    &:hover {
        opacity: 0.9;
    }
`;
