import NextLink from "next/link";
import type { PropsWithChildren } from "react";

import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Box, Link as ChakraLink } from "@chakra-ui/react";

import { lightPop } from "commons/animations";

interface LinkProps extends ChakraLinkProps {
    href: string;
    hasAnimation?: boolean;
}

export const Link = ({ href, hasAnimation, children, ...rest }: PropsWithChildren<LinkProps>) => (
    <WithAnimation hasAnimation={hasAnimation}>
        <NextLink passHref href={href}>
            <ChakraLink
                position="relative"
                rel="norefferer"
                target="_blank"
                _hover={{ textDecoration: "none" }}
                {...rest}
            >
                {children}
            </ChakraLink>
        </NextLink>
    </WithAnimation>
);

const WithAnimation = ({ hasAnimation, children }: PropsWithChildren<{ hasAnimation?: boolean }>) =>
    hasAnimation ? (
        <Box
            as="span"
            position="relative"
            sx={{
                "--chakra-translate-y": "initial",
                "& > a": {
                    display: "inline-block",
                    transform: "auto-gpu",
                    transitionProperty: "transform",
                    transitionDuration: "fast",
                    willChange: "transform",
                },
            }}
            _hover={{ "& > a": lightPop }}
            _after={{
                content: "''",
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 1,
                _hover: { "& > a": lightPop },
            }}
        >
            {children}
        </Box>
    ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );

//  withAnimation that takes animation as a prop, and animates the link like in the socials section
