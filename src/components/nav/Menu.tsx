import { styled, breakpoints } from "@/theme";

import { useRef, useState } from "react";

import { menuHoverAtom } from "@/commons/atoms";
import { fadeInAndScale, normalBounce } from "@/commons/framer";
import { CloseIcon, HamburgerMenuIcon } from "@/commons/icons";
import { PAGE_ROUTES, SOCIAL_ROUTES } from "@/commons/routes";

import { Divider } from "@/components/layout";

import MenuItem from "@/components/nav/MenuItem";

import useOutsideMenuClick from "@/hooks/useOutsideMenuClick";
import useWindowWidthInBounds from "@/hooks/useWindowWidth";

import SectionMenuItem from "@/components/nav/RouteMenuItem";
import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";

export default function Menu() {
    const menuRef = useRef<HTMLUListElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const setMenuHover = useSetAtom(menuHoverAtom);

    useOutsideMenuClick({
        menuRef,
        buttonRef: menuButtonRef,
        handler() {
            setIsMenuOpen(false);
            setMenuHover(null);
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
                        onHoverEnd={() => setMenuHover(null)}
                    >
                        {PAGE_ROUTES.map(({ name, icon }) => (
                            <SectionMenuItem key={name} name={name} icon={icon} />
                        ))}
                        <Divider />
                        {SOCIAL_ROUTES.map(({ name, href, icon }, index) => (
                            <MenuItem key={name} newTab name={name} href={href} icon={icon} />
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
