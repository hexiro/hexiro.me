import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import Script from "next/script";
import React, { useEffect } from "react";

import { NAV_PATHS } from "@/commons/config";
import { useSelectedRouteStore, useRouteAnimationStore } from "@/commons/state";

import Nav from "@/layout/Nav";
import Page from "@/layout/Page";
import { PageNextNavigation, PagePrevNavigation } from "@/layout/PageEndNavigation";
import PageTransition from "@/layout/PageTransition";
import "@/styles/globals.css";

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
    const setSelectedRouteIndex = useSelectedRouteStore((state) => state.setIndex);
    const setAnimationRoutes = useRouteAnimationStore((state) => state.set);

    useEffect(() => {
        function handler() {
            const newIndex = NAV_PATHS.findIndex((path) => path === router.pathname);
            setSelectedRouteIndex(newIndex);
        }

        handler();
        router.events.on("routeChangeComplete", handler);
        return () => router.events.off("routeChangeComplete", handler);
    }, [router, setSelectedRouteIndex]);

    useEffect(() => {
        function handler(newRoute: string) {
            const oldRoute = router.asPath;
            setAnimationRoutes(newRoute, oldRoute);
        }

        router.events.on("routeChangeStart", handler);
        return () => router.events.off("routeChangeStart", handler);
    }, [router, setAnimationRoutes]);

    return (
        <>
            <Meta />
            <Page cssVariables={[sansSerifFont.variable, monospaceFont.variable]}>
                <Nav />
                <Content>
                    <PageTransition pathname={router.pathname}>
                        <PagePrevNavigation />
                        <Component {...pageProps} />
                        <PageNextNavigation />
                    </PageTransition>
                </Content>
            </Page>
        </>
    );
}

function Meta() {
    return (
        <>
            <Script
                async
                src="https://umami.hexiro.me/script.js"
                data-website-id="79c5f103-7ed6-4bc8-9d6a-626e5f1e2ac2"
            />
            <style jsx global>{`
                html {
                    font-family: ${sansSerifFont.style.fontFamily};
                }
            `}</style>
        </>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <main className="mt-32 flex min-h-screen w-full flex-col rounded-t-md bg-background px-[5%] py-28 lg:ml-52 lg:mt-0 lg:rounded-l-md lg:px-[10%]">
            {children}
        </main>
    );
}
