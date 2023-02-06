import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { idToHref } from "@/commons";
import { fadeIn, smallBounce } from "@/commons/framer";
import type { IconType } from "@/commons/icons";

import { Link } from "@/components/ui";

import { AnimatePresence, motion } from "framer-motion";

type MenuItemProps = {
    name: string;
    icon: IconType;
    isSelected: boolean;
    href?: string;
    newTab?: boolean;
} & ComponentProps<typeof MenuItemWrapper>;

const MenuItem = ({ name, icon, href, isSelected, newTab, ...props }: MenuItemProps) => (
    <MenuItemWrapper {...props}>
        <FlexLink noNextLink newTab={newTab} href={href ? href : idToHref(name)}>
            {icon()}
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
});

const MenuItemWrapper = styled(motion.li, {
    position: "relative",
    paddingY: "7px",

    "& svg": {
        color: "$$svgColor",
    },

    defaultVariants: {
        highlighted: true,
    },

    variants: {
        highlighted: {
            true: {
                $$svgColor: "$colors$brand-primary",
            },
            false: {
                $$svgColor: "$colors$background-tertiary",
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
