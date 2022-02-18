import type { PropsWithChildren } from "react";

import theme from "commons/theme";

import styled from "styled-components";

type HeaderProps = PropsWithChildren<Record<string, unknown>>;

export const Header = ({ children }: HeaderProps): JSX.Element => (
    <HeaderContainer>{children}</HeaderContainer>
);

const HeaderContainer = styled.span`
    color: ${theme.accent.main};
    font-weight: 400;
`;
