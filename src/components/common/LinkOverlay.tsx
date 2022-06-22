import NextLink from "next/link";

import type { LinkOverlayProps as ChakraLinkOverlayProps } from "@chakra-ui/react";
import { LinkOverlay as ChakraLinkOverlay } from "@chakra-ui/react";

interface LinkOverlayProps extends ChakraLinkOverlayProps {
    href: string;
}

export default function LinkOverlay({ href, children, ...rest }: LinkOverlayProps) {
    return (
        <NextLink passHref href={href}>
            <ChakraLinkOverlay rel="norefferer" target="_blank" {...rest}>
                {children}
            </ChakraLinkOverlay>
        </NextLink>
    );
}
