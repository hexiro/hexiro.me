import type { config } from "@/theme";
import { styled } from "@/theme";
import type { ComponentProps, VariantProps } from "@stitches/react";

import NextLink from "next/link";
import type { PropsWithChildren } from "react";

import { Span } from "@/components/ui";

import type { StyledComponent } from "@stitches/react/types/styled-component";

type SpanProps = VariantProps<typeof Span>;

type LinkProps = Omit<ComponentProps<Anchor>, "target"> &
    SpanProps & {
        href: string;
        noNextLink?: boolean;
        newTab?: boolean;
    };

const Link = ({ href, newTab, noNextLink, animation, color, lineHeight, ...props }: LinkProps) => (
    <WithSpan animation={animation} color={color} lineHeight={lineHeight}>
        <LinkWrapper
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
            as={noNextLink ? "a" : undefined}
            {...props}
        />
    </WithSpan>
);

type Anchor = StyledComponent<"a", {}, typeof config["media"], typeof config>;

const LinkWrapper = styled(NextLink, {
    display: "inline-block",
    textDecoration: "inherit",
    color: "inherit",
});

const WithSpan = ({ animation, color, lineHeight, children }: PropsWithChildren<SpanProps>) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!animation && !color && !lineHeight) return <>{children}</>;
    return (
        <Span animation={animation} color={color} lineHeight={lineHeight}>
            {children}
        </Span>
    );
};

export default Link;
