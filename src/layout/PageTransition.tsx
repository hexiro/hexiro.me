import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import type { NavigationDirection } from "@/commons/animations";
import { PAGE_TRANSITION, PAGE_TRANSITION_VARIANTS } from "@/commons/animations";
import { NAV_PATHS } from "@/commons/config";

import { AnimatePresence, motion } from "framer-motion";

interface PageTransitionProps {
    readonly children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const router = useRouter();
    const [navigationDirection, setNavigationDirection] = useState<NavigationDirection>(null);

    useEffect(() => {
        const handler = (newRoute: string) => {
            const oldRoute = router.asPath;
            const newRouteIndex = newRoute ? NAV_PATHS.findIndex((path) => path === newRoute) : -1;
            const oldRouteIndex = oldRoute ? NAV_PATHS.findIndex((path) => path === oldRoute) : -1;
            const navigationDirection = newRouteIndex >= oldRouteIndex ? "down" : "up";

            setNavigationDirection(navigationDirection);
        };

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
                variants={PAGE_TRANSITION_VARIANTS}
                transition={PAGE_TRANSITION}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
