import type { ComponentProps } from "@stitches/react";
import { styled } from "theme";

import { createElement } from "react";

import type { IconType } from "@/commons/icons";
import Link from "@/components/ui/Link";

import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";

type MenuItemProps = {
    name: string;
    href: string;
    icon: IconType;
    isSelected: boolean;
    newTab?: boolean;
} & ComponentProps<typeof MenuItemWrapper>;

const transition: Transition = {
    type: "spring",
    duration: 0.4,
    bounce: 0.15,
};

const variants: Variants = {
    animate: {
        opacity: 1,
    },
    initial: {
        opacity: 0,
    },
};

const MenuItem = ({ name, href, icon, isSelected, newTab, ...props }: MenuItemProps) => (
    <MenuItemWrapper {...props}>
        <FlexLink newTab={newTab} href={href}>
            {createElement(icon)}
            <Text>{name}</Text>
        </FlexLink>
        <AnimatePresence>
            {isSelected && (
                <MenuHoverHighlight
                    variants={variants}
                    transition={transition}
                    layoutId="menu-hover-highlight"
                    initial="initial"
                    animate="animate"
                    exit="initial"
                />
            )}
        </AnimatePresence>
    </MenuItemWrapper>
);

export default MenuItem;

const FlexLink = styled(Link, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    height: "100%",
    paddingX: "20px",
});

const Text = styled("p", {
    fontSize: 18,
    fontWeight: 600,
    color: "$text-primary",
    paddingLeft: "",
});

const MenuItemWrapper = styled(motion.li, {
    position: "relative",
    paddingY: "7px",

    variants: {
        highlighted: {
            true: {
                "& svg": {
                    color: "$brand-primary",
                },
            },
            false: {
                "& svg": {
                    color: "$background-tertiary",
                },
            },
        },
    },
});

const MenuHoverHighlight = styled(motion.div, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "$lighten-10",
    zIndex: -1,
});
