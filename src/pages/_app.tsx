import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import Link from "next/link";
import type { MutableRefObject, PropsWithChildren } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";

import type { INavRouteName } from "@/commons/config";
import { NAV_PATHS, ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import { H2 } from "@/components/ui/Headings";
import type { IconType } from "@/components/ui/Icons";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/ui/Icons";

import "@/styles/globals.css";

import { Lenis } from "@studio-freight/react-lenis";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";
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

    const isSelected = (name: INavRouteName) => name === ROUTES[selectedRoute]?.name;

    useEffect(() => {
        setSelectedRoute(findSelectedRoute());
    }, [findSelectedRoute, router.pathname]);

    const prevRoute = NAV_PATHS[selectedRoute - 1];
    const nextRoute = NAV_PATHS[selectedRoute + 1];

    const ref = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
    const { events } = useDraggable(ref);

    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${sansSerifFont.style.fontFamily};
                }
            `}</style>
            <Lenis root>
                <div
                    className={clsx(
                        sansSerifFont.variable,
                        monospaceFont.variable,
                        "bg-background-secondary relative flex flex-col md:flex-row min-h-screen min-w-screen h-full w-full overflow-x-hidden overflow-y-auto"
                    )}
                >
                    <nav
                        ref={ref}
                        className="fixed flex overflow-y-hidden flex-row z-40 w-screen bg-background-secondary h-32 md:items-start md:flex-col md:w-52 md:h-screen"
                        {...events}
                    >
                        <div className="flex items-center justify-center px-8  md:px-6 md:w-full md:h-52 ">
                            <H2 className="text-6xl md:text-7xl">NL</H2>
                        </div>
                        <HorizontalDivider className="divide-x w-0 h-[80%] md:h-0 md:w-[80%] md:mx-auto" />
                        <motion.ul className="flex items-center w-fit h-full gap-8 px-12  md:gap-4 md:my-8 md:items-start md:flex-col md:w-full md:h-[unset] md:p-6 md:pr-0">
                            {ROUTES.map(({ name, path }, index) => (
                                <motion.li
                                    key={name}
                                    className="relative flex items-center w-full h-full text-lg"
                                >
                                    <Link href={path} className="text-off-white">
                                        <span className="mr-1 text-green">/</span>
                                        {name}
                                    </Link>
                                    {isSelected(name) ? (
                                        <motion.div
                                            layoutId="selected-route-indicator"
                                            className="absolute bg-green z-20 h-2 top-0 w-full rounded-b-[4px] md:right-0 md:top-[-10%] md:w-2 md:h-[120%] md:rounded-l-[4px]"
                                            style={{ originY: "0px" }}
                                        />
                                    ) : null}
                                </motion.li>
                            ))}
                        </motion.ul>
                        <VerticalDivider className="ml-[25%] h-72 hidden md:block" />
                    </nav>
                    <main className="bg-background py-28 px-[10%] flex flex-col w-full rounded-t-md mt-32 md:mt-0 md:ml-52 md:rounded-l-md min-h-screen">
                        <div>
                            <PageEndNavigation
                                href={prevRoute}
                                icon={ArrowUpIcon}
                                className="mt-2 mb-8"
                            >
                                Prev
                            </PageEndNavigation>
                            <div className="flex-grow">
                                <Component key={router.pathname} {...pageProps} />
                            </div>
                            <PageEndNavigation
                                href={nextRoute}
                                icon={ArrowDownIcon}
                                className="mt-8 mb-2"
                            >
                                Next
                            </PageEndNavigation>
                        </div>
                    </main>
                </div>
            </Lenis>
        </>
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
            className={twMerge(
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
