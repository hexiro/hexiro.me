import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { NAV_PATHS } from "@/commons/config";

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

export default function PageTransition({ children }: { readonly children: React.ReactNode }) {
    const router = useRouter();
    const [navigationDirection, setNavigationDirection] = useState<NavigationDirection>(null);

    useEffect(() => {
        function handler(newRoute: string) {
            const oldRoute = router.asPath;

            console.log("newRoute", newRoute, "oldRoute", oldRoute);

            const newRouteIndex = newRoute ? NAV_PATHS.findIndex((path) => path === newRoute) : -1;
            const oldRouteIndex = oldRoute ? NAV_PATHS.findIndex((path) => path === oldRoute) : -1;
            const navigationDirection = newRouteIndex >= oldRouteIndex ? "down" : "up";

            setNavigationDirection(navigationDirection);
        }

        router.events.on("routeChangeStart", handler);
        return () => router.events.off("routeChangeStart", handler);
    }, [router.asPath, router.events]);

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
                key={router.pathname}
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
