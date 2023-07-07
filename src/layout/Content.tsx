import Link from "next/link";
import type { Router } from "next/router";
import type { PropsWithChildren } from "react";
import { useCallback, useState, useEffect } from "react";

import { NAV_PATHS } from "@/commons/config";

import type { IconType } from "@/components/ui/Icons";
import { ArrowUpIcon, ArrowDownIcon } from "@/components/ui/Icons";

import Nav from "@/layout/Nav";

import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface IContentProps extends PropsWithChildren {
    router: Router;
}

export default function Content({ router, children }: IContentProps) {
    const findSelectedRoute = useCallback(
        () => NAV_PATHS.findIndex((path) => path === router.pathname),
        [router.pathname]
    );

    const [newRoute, setNewRoute] = useState<string | null>(null);
    const [oldRoute, setOldRoute] = useState<string | null>(null);

    useEffect(() => {
        const handler = (newRoute: string) => {
            const oldRoute = router.asPath;
            setOldRoute(oldRoute);
            setNewRoute(newRoute);
        };

        router.events.on("routeChangeStart", handler);
        return () => {
            router.events.off("routeChangeStart", handler);
        };
    }, [router]);

    const [selectedRoute, setSelectedRoute] = useState<number>(findSelectedRoute());

    useEffect(() => {
        const handler = () => {
            setSelectedRoute(findSelectedRoute());
        };

        router.events.on("routeChangeComplete", handler);
        return () => router.events.off("routeChangeComplete", handler);
    }, [findSelectedRoute, router]);

    const prevRoute = NAV_PATHS[selectedRoute - 1];
    const nextRoute = NAV_PATHS[selectedRoute + 1];

    const oldRouteIndex = oldRoute ? NAV_PATHS.findIndex((path) => path === oldRoute) : -1;
    const newRouteIndex = newRoute ? NAV_PATHS.findIndex((path) => path === newRoute) : -1;
    const isNavigatingDown = newRouteIndex >= oldRouteIndex;

    const variants: Variants = {
        hidden: (isNavigatingDown) =>
            isNavigatingDown ? { opacity: 0, x: 0, y: 100 } : { opacity: 0, x: 0, y: -100 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: (isNavigatingDown) =>
            isNavigatingDown ? { opacity: 0, x: 0, y: -100 } : { opacity: 0, x: 0, y: 100 },
    };

    return (
        <>
            <Nav selectedRoute={selectedRoute} />
            <AnimatePresence
                mode="wait"
                custom={isNavigatingDown}
                initial={false}
                onExitComplete={() =>
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: "instant",
                    })
                }
            >
                <motion.main
                    key={router.pathname}
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    custom={isNavigatingDown}
                    variants={variants}
                    transition={{
                        type: "spring",
                        duration: 0.6,
                        bounce: 0.15,
                    }}
                    className="mb-32 flex min-h-screen w-full flex-col rounded-t-md bg-background px-[5%] py-28 lg:mb-0 lg:ml-52 lg:mt-0 lg:rounded-l-md lg:px-[10%]"
                >
                    <div>
                        <PageEndNavigation
                            href={prevRoute}
                            icon={ArrowUpIcon}
                            className="mb-8 mt-2"
                        >
                            Prev
                        </PageEndNavigation>
                        <div className="flex-grow">{children}</div>
                        <PageEndNavigation
                            href={nextRoute}
                            icon={ArrowDownIcon}
                            className="mb-2 mt-8"
                        >
                            Next
                        </PageEndNavigation>
                    </div>
                </motion.main>
            </AnimatePresence>
        </>
    );
}

interface IPageEndNavigationProps extends PropsWithChildren {
    href: string | undefined;
    icon: IconType;
    className?: string;
}

const PageEndNavigation = ({ href, icon: Icon, className, children }: IPageEndNavigationProps) => {
    const AnchorElement = href ? Link : "a";
    const disabled = !href;

    return (
        <AnchorElement
            // @ts-expect-error ts doesn't recognize that href can't be undefined when using Link
            href={href}
            className={twMerge(
                "justify-left flex items-center text-base text-text aria-disabled:cursor-not-allowed aria-disabled:line-through aria-disabled:opacity-50",
                className
            )}
            aria-disabled={disabled}
        >
            <Icon className="text-text" />
            <span className="ml-1">{children}</span>
        </AnchorElement>
    );
};
