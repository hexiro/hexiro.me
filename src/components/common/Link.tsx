import NextLink from "next/link";
import type { PropsWithChildren } from "react";

import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Box, Link as ChakraLink } from "@chakra-ui/react";

import { extraLightPop } from "commons/animations";

interface LinkProps extends ChakraLinkProps {
    href: string;
    hasAnimation?: boolean;
}

export const Link = ({ href, hasAnimation, children, ...rest }: PropsWithChildren<LinkProps>) => (
    <NextLink passHref href={href}>
        <ChakraLink position="relative" rel="norefferer" target="_blank" {...rest}>
            <WithAnimation hasAnimation={hasAnimation}>{children}</WithAnimation>
        </ChakraLink>
    </NextLink>
);

const WithAnimation = ({ hasAnimation, children }: PropsWithChildren<{ hasAnimation?: boolean }>) =>
    hasAnimation ? (
        <Box
            as="span"
            display="inline-block"
            transform="auto-gpu"
            transitionProperty="transform"
            transitionDuration="fast"
            willChange="transform"
            sx={{
                "--chakra-translate-y": "initial",
            }}
            _hover={{ ...extraLightPop, paddingBottom: 1 }}
        >
            {children}
        </Box>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );

//  withAnimation that takes animation as a prop, and animates the link like in the socials section
