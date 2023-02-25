import { styled } from "@/theme";

import { fadeIn } from "@/commons/framer";
import type { PageRouteType } from "@/commons/routes";

import { Link, ListItem } from "@/components/ui";

import usePageRoute from "@/hooks/usePageRoute";

import { AnimatePresence, motion } from "framer-motion";

type PageRouteProps = Omit<PageRouteType, "icon">;
export default function PageRoute({ name, href }: PageRouteProps) {
    const pageRoute = usePageRoute();
    return (
        <RouteListItem>
            <Link href={href} animation="popAndTap">
                {name}
            </Link>
            <AnimatePresence initial={false}>
                {pageRoute?.name === name && (
                    <RouteUnderline
                        variants={fadeIn}
                        layoutId="nav-route-underline"
                        initial="initial"
                        animate="animate"
                        exit="initial"
                    />
                )}
            </AnimatePresence>
        </RouteListItem>
    );
}

const RouteListItem = styled(motion(ListItem), {
    position: "relative",
});

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
