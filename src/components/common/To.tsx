import NextLink from "next/link";
import type { PropsWithChildren } from "react";

import { lightPop } from "commons/animations";

import { Link as ChakraLink } from "@chakra-ui/react";

type ToProps = PropsWithChildren<{ href: string }>;

export const To = ({ href, children }: ToProps) => (
    <NextLink passHref href={href}>
        <ChakraLink rel="norefferer" target="_blank" transform="auto" _hover={lightPop}>
            {children}
        </ChakraLink>
    </NextLink>
);
