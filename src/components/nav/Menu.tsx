import { styled, breakpoints } from "@/theme";

import { useRef, useState } from "react";

import { fadeInAndScale, normalBounce } from "@/commons/framer";
import { CloseIcon, HamburgerMenuIcon } from "@/commons/icons";
import { ROUTES, SOCIALS } from "@/commons/secitions";

import { Divider } from "@/components/layout";

import MenuItem from "@/components/nav/MenuItem";

import useNavState from "@/hooks/useNavState";
import useOutsideMenuClick from "@/hooks/useOutsideMenuClick";
import useWindowWidthInBounds from "@/hooks/useWindowWidth";

import { AnimatePresence, motion } from "framer-motion";

export default function Menu() {
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const { selectedIndex, isHome } = useNavState();

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [menuHoverIndex, setMenuHoverIndex] = useState<number | null>(null);

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
        <>
            <button ref={menuButtonRef} type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
            </button>
            <AnimatePresence initial={false}>
                {isMenuOpen && (
                    <MenuContainer
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
                                onHoverStart={() => setMenuHoverIndex(index + ROUTES.length)}
                            />
                        ))}
                    </MenuContainer>
                )}
            </AnimatePresence>
        </>
    );
}

const MenuContainer = styled(motion.ul, {
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
