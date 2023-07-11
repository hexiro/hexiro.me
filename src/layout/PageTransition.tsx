import { useRouteAnimationStore } from "@/hooks/stores";

import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";

type NavigationDirection = "up" | "down" | null;

const variants: Variants = {
    hidden: (direction: NavigationDirection) =>
        direction === "up" ? { opacity: 0, x: 0, y: -100 } : { opacity: 0, x: 0, y: 100 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: (direction: NavigationDirection) =>
        direction === "up" ? { opacity: 0, x: 0, y: 100 } : { opacity: 0, x: 0, y: -100 },
};

export default function PageTransition({
    pathname,
    children,
}: {
    pathname: string;
    children: React.ReactNode;
}) {
    const navigationDirection = useRouteAnimationStore((state) => state.navigationDirection);

    return (
        <AnimatePresence
            mode="wait"
            custom={navigationDirection}
            initial={false}
            onExitComplete={() =>
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "instant",
                })
            }
        >
            <motion.div
                key={pathname}
                initial="hidden"
                animate="enter"
                exit="exit"
                custom={navigationDirection}
                variants={variants}
                transition={{
                    type: "spring",
                    duration: 0.6,
                    bounce: 0.15,
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
