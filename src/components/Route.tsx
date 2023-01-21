import { styled } from "@/theme";

import Link from "@/components/ui/Link";
import ListItem from "@/components/ui/ListItem";
import Span from "@/components/ui/Span";

import { motion } from "framer-motion";

interface RouteProps {
    name: string;
    href: string;
    isSelected: boolean;
}

export default function Route({ name, href, isSelected }: RouteProps) {
    return (
        <ListItem key={name} css={{ position: "relative" }}>
            <Link href={href}>
                <Span animation="pop">{name}</Span>
            </Link>
            {isSelected && <Underline layoutId="underline" />}
        </ListItem>
    );
}

const Underline = styled(motion.div, {
    position: "absolute",
    bottom: -25,
    left: "-2%",
    width: "104%",
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "$brand-primary",
});
