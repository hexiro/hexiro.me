import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { fadeIn, smallBounce } from "@/commons/animations";
import { hoveredRouteAtom } from "@/commons/atoms";
import type { IconType } from "@/commons/icons";
import type { PageRouteName, SocialRouteName } from "@/commons/routes";

import { Link } from "@/components/ui";

import useIsRouteHovered from "@/hooks/useIsRouteHovered";
import usePageRoute from "@/hooks/usePageRoute";

import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";

type MenuItemProps = ComponentProps<typeof MenuItemWrapper> & {
    name: PageRouteName | SocialRouteName;
    icon: IconType;
    href: string;
    newTab?: boolean;
    highlightedIcon?: boolean;
};

const MenuItem = ({ name, icon, href, newTab, highlightedIcon, ...props }: MenuItemProps) => {
    const pageRoute = usePageRoute();

    const isHovered = useIsRouteHovered(name);
    const setMenuHover = useSetAtom(hoveredRouteAtom);

    highlightedIcon ??= pageRoute?.name === name;

    return (
        <MenuItemWrapper onHoverStart={() => setMenuHover(name)} {...props}>
            <FlexLink newTab={newTab} href={href}>
                <RouteIcon highlighted={highlightedIcon}>{icon()}</RouteIcon>
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

    defaultVariants: {
        coloredIcon: true,
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

const RouteIcon = styled(motion.div, {
    "& svg": {
        willTransition: "color",
        transitionDuration: "$medium",
        transitionTimingFunction: "$ease-in-out",
        color: "$$svgColor",
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
