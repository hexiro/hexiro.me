import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import React from "react";

import Content from "@/layout/Content";
import "@/styles/globals.css";

import { Lenis } from "@studio-freight/react-lenis";
import clsx from "clsx";

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
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${sansSerifFont.style.fontFamily};
                }
            `}</style>
            <Lenis
                root
                options={{
                    smoothWheel: true,
                    smoothTouch: true,
                    lerp: 0.07,
                    touchMultiplier: 1.5,
                }}
            >
                <div
                    className={clsx(
                        sansSerifFont.variable,
                        monospaceFont.variable,
                        "bg-background-secondary relative flex flex-col-reverse md:flex-row min-h-screen min-w-screen h-full w-full overflow-x-hidden overflow-y-auto"
                    )}
                >
                    <Content router={router}>
                        <Component key={router.route} {...pageProps} />
                    </Content>
                </div>
            </Lenis>
        </>
    );
}
