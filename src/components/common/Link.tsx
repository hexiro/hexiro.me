import NextLink from "next/link";
import type { PropsWithChildren } from "react";

import { lightPop } from "commons/animations";

import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

interface LinkProps extends ChakraLinkProps {
    href: string;
}

export const Link = ({ href, children, ...rest }: PropsWithChildren<LinkProps>) => (
    <NextLink passHref href={href}>
        <ChakraLink rel="norefferer" target="_blank" transform="auto" _hover={lightPop} {...rest}>
            {children}
        </ChakraLink>
    </NextLink>
);
