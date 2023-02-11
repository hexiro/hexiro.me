import { styled } from "@/theme";

import { idToHref } from "@/commons";
import { fadeIn } from "@/commons/framer";
import type { RouteName } from "@/commons/sections";

import { Link, ListItem, Span } from "@/components/ui";

import useIsIndexPage from "@/hooks/useIsIndexPage";
import useIsSectionInView from "@/hooks/useIsSectionInView";

import { AnimatePresence, motion } from "framer-motion";

interface RouteProps {
    name: RouteName;
}

export default function Route({ name }: RouteProps) {
    const isIndexPage = useIsIndexPage();
    const isSelected = useIsSectionInView(name);

    return (
        <ListItem key={name} css={{ position: "relative" }}>
            <Link noNextLink href={idToHref(name)}>
                <Span animation="popAndTap">{name}</Span>
            </Link>
            <AnimatePresence initial={false}>
                {isIndexPage && isSelected ? (
                    <RouteUnderline
                        variants={fadeIn}
                        layoutId="nav-route-underline"
                        initial="initial"
                        animate="animate"
                        exit="initial"
                    />
                ) : null}
            </AnimatePresence>
        </ListItem>
    );
}

const RouteUnderline = styled(motion.div, {
    position: "absolute",
    bottom: -25,
    left: "-2%",
    width: "104%",
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "$brand-primary",
});
