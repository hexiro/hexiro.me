import NextLink from "next/link";

import type { LinkOverlayProps as ChakraLinkOverlayProps } from "@chakra-ui/react";
import { LinkOverlay as ChakraLinkOverlay } from "@chakra-ui/react";

interface LinkOverlayProps extends ChakraLinkOverlayProps {
    href: string;
}

export const LinkOverlay = ({ href, children, ...rest }: LinkOverlayProps) => (
    <NextLink passHref href={href}>
        <ChakraLinkOverlay rel="norefferer" target="_blank" {...rest}>
            {children}
        </ChakraLinkOverlay>
    </NextLink>
);
