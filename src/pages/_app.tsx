import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import React from "react";

import Content from "@/layout/Content";
import "@/styles/globals.css";

import { Lenis } from "@studio-freight/react-lenis";
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
                    className={twMerge(
                        sansSerifFont.variable,
                        monospaceFont.variable,
                        "min-w-screen relative flex h-full min-h-screen w-full flex-col-reverse overflow-y-auto overflow-x-hidden bg-background md:flex-row"
                    )}
                >
                    <Content router={router}>
                        <Component {...pageProps} />
                    </Content>
                </div>
            </Lenis>
        </>
    );
}
