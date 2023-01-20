import { styled } from "theme";

import Link from "@/components/common/Link";
import ListItem from "@/components/common/ListItem";
import Span from "@/components/common/Span";
import { motion } from "framer-motion";

interface RouteProps {
    name: string;
    href: string;
    isSelected: boolean;
}

export default function Route({ name, href, isSelected }: RouteProps) {
    return (
        <AnchorListItemWrapper key={name}>
            <Link href={href}>
                <Span animation="pop">{name}</Span>
            </Link>
            {isSelected && <Underline layoutId="underline" />}
        </AnchorListItemWrapper>
    );
}

const AnchorListItemWrapper = styled(ListItem, {
    position: "relative",
});

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
