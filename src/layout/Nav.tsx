import { styled } from "@/theme";

import { createElement, useRef } from "react";

import { fadeInAndScale, normalBounce } from "@/commons/animations";
import type { IconType } from "@/commons/icons";
import { CloseIcon, HamburgerMenuIcon } from "@/commons/icons";
import MenuItem from "@/components/MenuItem";
import Route from "@/components/Route";
import { Hide, Show } from "@/components/layout";
import { AnchorList, Heading, ListItem, Span } from "@/components/ui";
import { isMenuOpenAtom, menuHoverIndexAtom } from "@/state/atoms";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideMenuClick from "hooks/useOutsideMenuClick";
import { useAtom } from "jotai";

export interface NavRoute {
    name: string;
    href: string;
    icon: IconType;
}

interface NavProps {
    routes: NavRoute[];
    socials: NavRoute[];
    index: number;
}

export default function Nav({ routes, socials, index: selectedRouteIndex }: NavProps) {
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
    const [menuHoverIndex, setMenuHoverIndex] = useAtom(menuHoverIndexAtom);

    useOutsideMenuClick({
        menuRef,
        buttonRef: menuButtonRef,
        handler() {
            setIsMenuOpen(false);
            setMenuHoverIndex(null);
        },
    });

    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <Hide below="md">
                    <UnorderedList>
                        {routes.map(({ name, href }, index) => (
                            <Route
                                key={name}
                                name={name}
                                href={href}
                                isSelected={index === selectedRouteIndex}
                            />
                        ))}
                    </UnorderedList>
                </Hide>
                <Show below="md">
                    <ListItem as="p">{routes[selectedRouteIndex].name}</ListItem>
                </Show>
            </NavLeft>
            <NavRight>
                <Hide below="md">
                    <AnchorList.List>
                        {socials.map(({ name, href, icon }) => (
                            <AnchorList.Item key={name} newTab href={href}>
                                {createElement(icon)}
                            </AnchorList.Item>
                        ))}
                    </AnchorList.List>
                </Hide>
                <Show below="md">
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
                                {routes.map(({ name, href, icon }, index) => (
                                    <MenuItem
                                        key={name}
                                        name={name}
                                        href={href}
                                        icon={icon}
                                        highlighted={index === selectedRouteIndex}
                                        isSelected={index === menuHoverIndex}
                                        onHoverStart={() => setMenuHoverIndex(index)}
                                    />
                                ))}
                                <Divider />
                                {socials.map(({ name, href, icon }, index) => (
                                    <MenuItem
                                        key={name}
                                        newTab
                                        name={name}
                                        href={href}
                                        icon={icon}
                                        isSelected={index + routes.length === menuHoverIndex}
                                        onHoverStart={() =>
                                            setMenuHoverIndex(index + routes.length)
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
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingY: "$main-y-padding",
    paddingX: "$main-x-padding",
    borderBottom: "2px solid $lighten-10",
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
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "$2",
    width: "14em",
    listStyle: "none",

    willChange: "transform",
    transformOrigin: "top right",

    backgroundColor: "$background-secondary",
    borderRadius: "$lg",
    border: "solid 1px $lighten-10",

    right: "$main-x-padding",
    top: "90%",

    paddingY: "20px",
});

const Divider = styled("hr", {
    width: "100%",
    borderBottom: "1px solid $lighten-10",
    marginY: "12px",
});
