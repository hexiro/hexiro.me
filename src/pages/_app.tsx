import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import type { INavRouteName } from "@/commons/config";
import { NAV_ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";

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
    const findSelectedRouteName = useCallback(
        () => NAV_ROUTES.find(({ path }) => path === router.pathname)?.name ?? null,
        [router.pathname]
    );

    const [selectedRouteName, setSelectedRouteName] = useState<INavRouteName | null>(
        findSelectedRouteName()
    );

    const isSelected = (name: INavRouteName) => name === selectedRouteName;

    useEffect(() => {
        setSelectedRouteName(findSelectedRouteName());
    }, [findSelectedRouteName, router.pathname]);

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
            <main className="bg-background p-12 flex-grow rounded-l-md md:rounded-t-md ">
                <Component key={router.pathname} {...pageProps} />
            </main>
        </div>
    );
}
