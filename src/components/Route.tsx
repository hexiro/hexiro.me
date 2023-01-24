import { styled } from "@/theme";

import { fadeIn } from "@/commons/animations";
import { Link, ListItem, Span } from "@/components/ui";

import { AnimatePresence, motion } from "framer-motion";

interface RouteProps {
    name: string;
    href: string;
    isSelected: boolean;
}

export default function Route({ name, href, isSelected }: RouteProps) {
    return (
        <ListItem key={name} css={{ position: "relative" }}>
            <Link href={href}>
                <Span animation="popAndTap">{name}</Span>
            </Link>
            <AnimatePresence initial={false}>
                {isSelected && (
                    <RouteUnderline
                        variants={fadeIn}
                        layoutId="nav-route-underline"
                        initial="initial"
                        animate="animate"
                        exit="initial"
                    />
                )}
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
