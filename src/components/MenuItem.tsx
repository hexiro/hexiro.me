import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { createElement } from "react";

import { fadeIn, smallBounce } from "@/commons/animations";
import type { IconType } from "@/commons/icons";
import Link from "@/components/ui/Link";

import { AnimatePresence, motion } from "framer-motion";

type MenuItemProps = {
    name: string;
    href: string;
    icon: IconType;
    isSelected: boolean;
    newTab?: boolean;
} & ComponentProps<typeof MenuItemWrapper>;

const MenuItem = ({ name, href, icon, isSelected, newTab, ...props }: MenuItemProps) => (
    <MenuItemWrapper {...props}>
        <FlexLink newTab={newTab} href={href}>
            {createElement(icon)}
            <Text>{name}</Text>
        </FlexLink>
        <AnimatePresence initial={false}>
            {isSelected && (
                <MenuHoverHighlight
                    variants={fadeIn}
                    transition={smallBounce}
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
