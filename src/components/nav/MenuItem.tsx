import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { idToHref } from "@/commons";
import { menuHoverIndexAtom } from "@/commons/atoms";
import { fadeIn, smallBounce } from "@/commons/framer";
import type { IconType } from "@/commons/icons";
import type { RouteName, SocialsName } from "@/commons/sections";

import { Link } from "@/components/ui";

import useIsSectionHovered from "@/hooks/useIsSectionHovered";

import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";

export type MenuItemProps = {
    name: RouteName | SocialsName;
    icon: IconType;
    href?: string;
    newTab?: boolean;
} & ComponentProps<typeof MenuItemWrapper>;

const MenuItem = ({ name, icon, href, newTab, ...props }: MenuItemProps) => {
    const isHovered = useIsSectionHovered(name);
    const setMenuHoverIndex = useSetAtom(menuHoverIndexAtom);

    return (
        <MenuItemWrapper onHoverStart={() => setMenuHoverIndex(name)} {...props}>
            <FlexLink noNextLink newTab={newTab} href={href ? href : idToHref(name)}>
                {icon()}
                <Text>{name}</Text>
            </FlexLink>
            <AnimatePresence initial={false}>
                {isHovered && (
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
};

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
        coloredIcon: true,
    },

    variants: {
        coloredIcon: {
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
