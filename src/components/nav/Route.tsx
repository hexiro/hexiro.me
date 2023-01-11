import { styled } from "theme";

import Link from "components/common/Link";
import ListItem from "components/common/ListItem";
import Span from "components/common/Span";
import { motion } from "framer-motion";

interface RouteProps {
    name: string;
    isSelected: boolean;
}

export default function Route({ name, isSelected }: RouteProps) {
    return (
        <ListItem key={name} style={{ textTransform: "capitalize", position: "relative" }}>
            <Link href={`/${name.toLowerCase()}`}>
                <Span animation="pop">{name}</Span>
            </Link>
            {/* {isSelected && <Underline layoutId="underline" />} */}
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
