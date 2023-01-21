import type { ComponentProps } from "@stitches/react";
import { styled } from "theme";

import NextLink from "next/link";

const LinkWrapper = styled(NextLink, {
    color: "inherit",
    textDecoration: "inherit",
});

type LinkProps = Omit<ComponentProps<typeof LinkWrapper>, "target"> & {
    newTab?: boolean;
};

const Link = ({ newTab, ...props }: LinkProps) => (
    <LinkWrapper target={newTab ? "_black" : undefined} {...props} />
);

export default Link;
