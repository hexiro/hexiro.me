import { styled } from "@/theme";
import type { ComponentProps, VariantProps } from "@stitches/react";

import NextLink from "next/link";
import type { PropsWithChildren } from "react";

import { Span } from "@/components/ui";

type SpanProps = VariantProps<typeof Span>;

type AnchorProps = Omit<ComponentProps<typeof LinkWrapper>, "target">;

type LinkProps = AnchorProps &
    SpanProps & {
        href: string;
        newTab?: boolean;
    };

const Link = ({ href, newTab, animation, color, lineHeight, ...props }: LinkProps) => (
    <WithSpan animation={animation} color={color} lineHeight={lineHeight}>
        <LinkWrapper
            href={href}
            target={newTab ? "_blank" : undefined}
            rel={newTab ? "noreferrer" : undefined}
            {...props}
        />
    </WithSpan>
);

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
