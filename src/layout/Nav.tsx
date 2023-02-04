import { breakpoints, styled } from "@/theme";

import { useRef, useState } from "react";

import { fadeInAndScale, normalBounce } from "@/commons/animations";
import { selectedRouteIndexAtom } from "@/commons/atoms";
import type { IconType } from "@/commons/icons";
import { CloseIcon, HamburgerMenuIcon } from "@/commons/icons";
import { ROUTES, SOCIALS } from "@/commons/secitions";

import { Divider, Hide, Show } from "@/components/layout";
import { AnchorList, Heading, ListItem, Span } from "@/components/ui";

import Route from "@/components/Route";
import Social from "@/components/Social";
import MenuItem from "@/components/home/MenuItem";

import useWindowWidthInBounds from "@/hooks/useWindowWidth";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideMenuClick from "hooks/useOutsideMenuClick";
import { useAtom } from "jotai";

export interface NavRoute {
    name: string;
    icon: IconType;
}

export interface SocialRoute {
    name: string;
    href: string;
    icon: IconType;
}

interface NavProps {
    isHome: boolean;
}

export default function Nav({ isHome }: NavProps) {
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [menuHoverIndex, setMenuHoverIndex] = useState<number | null>(null);

    const [selectedIndex, setSelectedIndex] = useAtom(selectedRouteIndexAtom);

    const pageName = ROUTES[selectedIndex]?.name ?? "Portfolio";

    useOutsideMenuClick({
        menuRef,
        buttonRef: menuButtonRef,
        handler() {
            setIsMenuOpen(false);
            setMenuHoverIndex(null);
        },
    });

    useWindowWidthInBounds({
        min: breakpoints.sm,
        handler(state) {
            if (state) setIsMenuOpen(false);
        },
    });

    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <Hide below="sm">
                    <UnorderedList>
                        {ROUTES.map(({ name }, index) => (
                            <Route
                                key={name}
                                name={name}
                                isSelected={isHome && index === selectedIndex}
                            />
                        ))}
                    </UnorderedList>
                </Hide>
                <Show below="sm">
                    <ListItem as="p">{pageName}</ListItem>
                </Show>
            </NavLeft>
            <NavRight>
                <Hide below="sm">
                    <AnchorList>
                        {SOCIALS.map((props) => (
                            <Social key={props.name} {...props} />
                        ))}
                    </AnchorList>
                </Hide>
                <Show below="sm">
                    <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
                    </button>
                    <AnimatePresence initial={false}>
                        {isMenuOpen && (
                            <Menu
                                ref={menuRef}
                                variants={fadeInAndScale}
                                transition={normalBounce}
                                initial="initial"
                                animate="animate"
                                exit="initial"
                                onHoverEnd={() => setMenuHoverIndex(null)}
                            >
                                {ROUTES.map(({ name, icon }, index) => (
                                    <MenuItem
                                        key={name}
                                        name={name}
                                        icon={icon}
                                        highlighted={index === selectedIndex}
                                        isSelected={isHome && index === menuHoverIndex}
                                        onHoverStart={() => setMenuHoverIndex(index)}
                                    />
                                ))}
                                <Divider />
                                {SOCIALS.map(({ name, href, icon }, index) => (
                                    <MenuItem
                                        key={name}
                                        newTab
                                        name={name}
                                        href={href}
                                        icon={icon}
                                        isSelected={index + ROUTES.length === menuHoverIndex}
                                        onHoverStart={() =>
                                            setMenuHoverIndex(index + ROUTES.length)
                                        }
                                    />
                                ))}
                            </Menu>
                        )}
                    </AnimatePresence>
                </Show>
            </NavRight>
        </NavContainer>
    );
}

const NavContainer = styled("nav", {
    display: "flex",
    position: "fixed",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingY: "$main-y-padding",
    paddingX: "$main-x-padding",
    borderBottom: "2px solid $lighten-10",
    boxShadow: "0 4px 20px 10px rgb(0 0 0 / 10%)",
    backgroundColor: "$background-primary",
    zIndex: "$above",
});

const NavLeft = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: "$4",
});

const NavRight = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "auto",
    paddingLeft: "$4",
});

const UnorderedList = styled("ul", {
    display: "flex",
    flexDirection: "row",
    gap: "$2",
    width: "100%",

    "@lg": {
        gap: "$3",
    },
});

const Menu = styled(motion.ul, {
    zIndex: 1,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "$2",
    listStyle: "none",

    willChange: "transform",
    transformOrigin: "top",

    backgroundColor: "$background-secondary-alpha-75",
    backdropFilter: "blur(4px)",

    borderRadius: "$lg",
    border: "solid 1px $lighten-10",

    top: "110%",
    left: 0,
    marginX: "0.5rem",
    width: "calc(100% - 1rem)",

    paddingY: "20px",

    "@xs": {
        width: "14em",
        left: "unset",
        top: "90%",
        right: "$main-x-padding",
        margin: "unset",
        transformOrigin: "top right",
    },
});
