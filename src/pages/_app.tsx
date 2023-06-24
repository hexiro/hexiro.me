import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useState } from "react";

import type { INavRouteName } from "@/commons/config";
import { NAV_PATHS, NAV_ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import type { IconType } from "@/components/ui/Icons";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/ui/Icons";

import "@/styles/globals.css";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const sansSerifFont = GolosText({
    weight: "variable",
    style: "normal",
    display: "swap",
    preload: true,
    subsets: ["latin"],
    variable: "--font-sans",
});

const monospaceFont = NotoSansMono({
    weight: "variable",
    style: "normal",
    display: "swap",
    preload: true,
    subsets: ["latin"],
    variable: "--font-mono",
});

export default function App({ Component, pageProps, router }: AppProps) {
    const findSelectedRoute = useCallback(
        () => NAV_PATHS.findIndex((path) => path === router.pathname),
        [router.pathname]
    );

    const [selectedRoute, setSelectedRoute] = useState<number>(findSelectedRoute());
    const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);

    const isSelected = (name: INavRouteName) => name === NAV_ROUTES[selectedRoute]?.name;
    const isHovered = (name: INavRouteName) =>
        hoveredRoute === null ? false : name === NAV_ROUTES[hoveredRoute]?.name;

    useEffect(() => {
        setSelectedRoute(findSelectedRoute());
    }, [findSelectedRoute, router.pathname]);

    const prevRoute = NAV_PATHS[selectedRoute - 1];
    const nextRoute = NAV_PATHS[selectedRoute + 1];

    return (
        <div
            className={clsx(
                sansSerifFont.variable,
                monospaceFont.variable,
                "bg-background-secondary relative flex flex-col md:flex-row min-h-screen min-w-screen h-full w-full overflow-x-hidden overflow-y-auto"
            )}
        >
            <nav className="flex items-center flex-shrink-0 h-36 w-screen md:items-start md:flex-col md:w-52 md:h-screen">
                <div className="px-8 py-6 md:px-6 flex justify-center items-center md:w-full md:h-52 ">
                    <h2 className="font-black text-6xl md:text-7xl">NL</h2>
                </div>
                <HorizontalDivider className="divide-x w-0 h-[80%] md:h-0 md:w-[80%] md:mx-auto" />
                <motion.ul
                    className="flex items-center w-fit h-full gap-8 px-12 overflow-x-auto md:gap-4 md:my-8 md:items-start md:flex-col md:w-full md:h-[unset] md:p-6 md:pr-0"
                    onHoverEnd={() => setHoveredRoute(null)}
                >
                    {NAV_ROUTES.map(({ name, path }, index) => (
                        <motion.li
                            key={name}
                            className="flex items-center text-lg relative h-full w-full"
                            onHoverStart={() => setHoveredRoute(index)}
                        >
                            <Link href={path} className="text-off-white">
                                <span className="text-green mr-1">/</span>
                                {name}
                            </Link>
                            {isSelected(name) ? (
                                <motion.div
                                    layoutId="selected-route-indicator"
                                    className="absolute bg-green z-20 h-2 top-0 w-full rounded-b-[4px] md:right-0 md:top-[-10%] md:w-2 md:h-[120%] md:rounded-l-[4px]"
                                />
                            ) : null}
                            <AnimatePresence>
                                {isHovered(name) ? (
                                    <motion.div
                                        layoutId="hovered-route-indicator"
                                        className={twMerge(
                                            "absolute bg-green z-20 h-2 top-0 w-full rounded-b-[4px] md:right-0 md:top-[-10%] md:w-2 md:h-[120%] md:rounded-l-[4px]",
                                            "bg-green/25 z-10"
                                        )}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                ) : null}
                            </AnimatePresence>
                        </motion.li>
                    ))}
                </motion.ul>
                <VerticalDivider className="ml-[25%] h-72 hidden md:block" />
            </nav>
            <main className="bg-background py-28 px-[10%] flex flex-col flex-grow rounded-t-md md:rounded-l-md min-h-screen">
                <PageEndNavigation href={prevRoute} icon={ArrowUpIcon} className="mt-2 mb-8">
                    Prev
                </PageEndNavigation>
                <div className="flex-grow">
                    <Component key={router.pathname} {...pageProps} />
                </div>
                <PageEndNavigation href={nextRoute} icon={ArrowDownIcon} className="mb-2 mt-8">
                    Next
                </PageEndNavigation>
            </main>
        </div>
    );
}

type IPageEndNavigationProps = PropsWithChildren<{
    href: string | undefined;
    icon: IconType;
    className?: string;
}>;

const PageEndNavigation = ({ href, icon: Icon, className, children }: IPageEndNavigationProps) => {
    const AnchorElement = href ? Link : "a";

    const disabled = !href;

    return (
        <AnchorElement
            // @ts-expect-error ts doesn't recognize that href can't be undefined when using Link
            href={href}
            className={clsx(
                "flex justify-left items-center text-text text-base aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
                className
            )}
            aria-disabled={disabled}
        >
            <Icon className="text-text" />
            <span className="ml-1">{children}</span>
        </AnchorElement>
    );
};
