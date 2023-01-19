import { styled } from "theme";

import { useState } from "react";

import { LinkedIn, GitHub, Twitter } from "commons/icons";
import Heading from "components/common/Heading";
import Span from "components/common/Span";
import Hide from "components/layout/Hide";
import Show from "components/layout/Show";
import Route from "components/nav/Route";
import type { Variants, Transition } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";

interface NavProps {
    routes: string[];
}

export default function Nav({ routes }: NavProps) {
    const [selectedRoute, setSelectedRoute] = useState(routes[0]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const transition: Transition = {
        type: "spring",
        duration: 0.45,
        bounce: 0.5,
    };

    const variants: Variants = {
        animate: {
            scale: 1,
            opacity: 1,
        },
        initial: {
            scale: 0.8,
            opacity: 0,
        },
    };

    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <Hide below="md">
                    <UnorderedList>
                        {routes.map((name) => (
                            <Route key={name} name={name} isSelected={name === selectedRoute} />
                        ))}
                    </UnorderedList>
                </Hide>
            </NavLeft>
            <NavRight>
                <Hide below="md">
                    <Icons>
                        <Twitter />
                        <GitHub />
                        <LinkedIn />
                    </Icons>
                </Hide>
                <Show below="md">
                    <StyledHamburger
                        rounded
                        size={30}
                        label="Open menu"
                        onToggle={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    <AnimatePresence>
                        {isMenuOpen && (
                            <Menu
                                variants={variants}
                                transition={transition}
                                initial="initial"
                                animate="animate"
                                exit="initial"
                            />
                        )}
                    </AnimatePresence>
                </Show>
            </NavRight>
        </NavContainer>
    );
}

const Icons = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: "$3",

    "& > svg": {
        height: 34,
        color: "$brand-primary",
    },
});

const StyledHamburger = styled(Hamburger, {
    color: "$text-primary",
});

const NavContainer = styled("nav", {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingY: 25,
    paddingX: "$main-lr-padding",
    borderBottom: "2px solid $lighten-10",
});

const NavLeft = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

const NavRight = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "auto",
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
    height: "25em",

    willChange: "transform",
    transformOrigin: "top right",

    backgroundColor: "$background-secondary",
    borderRadius: "$lg",
    border: "solid 2px $lighten-10",

    right: "$main-lr-padding",
    top: "90%",
});
