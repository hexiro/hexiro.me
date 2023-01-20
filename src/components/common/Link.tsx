import { styled } from "theme";

import NextLink from "next/link";

import type { ComponentProps } from "@stitches/react";

const LinkWrapper = styled(NextLink, {
    color: "inherit",
    textDecoration: "inherit",
    // willChange: "transform",
    // transition: "transform 0.2s ease-in-out",

    // "&:hover": {
    //     transform: "translateY(-2px)",
    // },
});

type LinkProps = Omit<ComponentProps<typeof LinkWrapper>, "target"> & {
    newTab?: boolean;
};

const Link = ({ newTab, ...props }: LinkProps) => (
    <LinkWrapper target={newTab ? "_black" : undefined} {...props} />
);

export default Link;
