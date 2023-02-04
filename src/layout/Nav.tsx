import { breakpoints, styled } from "@/theme";

import type { RefObject } from "react";
import { useRef, useState } from "react";

import { fadeInAndScale, normalBounce } from "@/commons/animations";
import type { IconType } from "@/commons/icons";
import { CloseIcon, HamburgerMenuIcon } from "@/commons/icons";

import Route from "@/components/Route";
import Social from "@/components/Social";
import MenuItem from "@/components/home/MenuItem";
import { Divider, Hide, Show } from "@/components/layout";
import { AnchorList, Heading, ListItem, Span } from "@/components/ui";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useWindowWidthInBounds from "@/hooks/useWindowWidth";

import { motion, AnimatePresence } from "framer-motion";
import useOutsideMenuClick from "hooks/useOutsideMenuClick";

export interface NavRoute {
    name: string;
    ref: RefObject<HTMLElement>;
    icon: IconType;
    inView: boolean;
}

export interface SocialRoute {
    name: string;
    href: string;
    icon: IconType;
}

interface NavProps {
    routes: NavRoute[];
    socials: SocialRoute[];
}

export default function Nav({ routes, socials }: NavProps) {
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [menuHoverIndex, setMenuHoverIndex] = useState<number | null>(null);

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const pageName = routes[selectedIndex]?.name ?? "Portfolio";

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

    useIsomorphicLayoutEffect(() => {
        const inViews = routes.map(({ inView }) => inView);

        for (let i = inViews.length - 1; i >= 0; i--) {
            if (inViews[i]) {
                setSelectedIndex(i);
                break;
            }
        }
    }, [routes]);

    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <Hide below="sm">
                    <UnorderedList>
                        {routes.map(({ name }, index) => (
                            <Route key={name} name={name} isSelected={index === selectedIndex} />
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
                        {socials.map((props) => (
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
                                {routes.map(({ name, icon }, index) => (
                                    <MenuItem
                                        key={name}
                                        name={name}
                                        icon={icon}
                                        highlighted={index === selectedIndex}
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
