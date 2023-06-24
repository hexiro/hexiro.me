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
import { motion } from "framer-motion";

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

    const isSelected = (name: INavRouteName) => name === NAV_ROUTES[selectedRoute]?.name;

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
                "bg-background-secondary relative flex flex-col md:flex-row min-h-screen min-w-screen h-full w-full"
            )}
        >
            <nav className="w-52 h-screen">
                <div className="w-full h-52 p-6 flex justify-center items-center">
                    <h2>NL</h2>
                </div>
                <HorizontalDivider className="w-[80%] mx-auto" />
                <div className="w-full p-6 pr-0 flex flex-col">
                    <ul className="my-5">
                        {NAV_ROUTES.map(({ name, path }) => (
                            <li key={name} className="my-5 text-2xl relative">
                                <Link href={path} className="text-off-white">
                                    <span className="text-green mr-1">/</span>
                                    {name}
                                </Link>
                                {isSelected(name) && (
                                    <motion.div
                                        layoutId="selected-route-indicator"
                                        className="absolute right-0 top-[-10%] w-2 h-[120%] bg-green rounded-l-[4px]"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <VerticalDivider className="ml-[25%] h-72" />
            </nav>
            <main className="bg-background py-28 px-36 flex flex-col flex-grow rounded-l-md md:rounded-t-md min-h-screen">
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
                "flex justify-left items-center text-text text-xl aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
                className
            )}
            aria-disabled={disabled}
        >
            <Icon className="text-text" />
            <span className="ml-1">{children}</span>
        </AnchorElement>
    );
};
