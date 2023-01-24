import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import NextLink from "next/link";

const LinkWrapper = styled(NextLink, {
    display: "inline-block",
    textDecoration: "inherit",
    color: "inherit",
});

type LinkProps = Omit<ComponentProps<typeof LinkWrapper>, "target"> & {
    newTab?: boolean;
};

const Link = ({ newTab, ...props }: LinkProps) => (
    <LinkWrapper target={newTab ? "_blank" : undefined} {...props} />
);

export default Link;
