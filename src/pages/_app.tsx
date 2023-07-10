import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import Script from "next/script";
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
            <Lenis root>
                <div
                    className={twMerge(
                        sansSerifFont.variable,
                        monospaceFont.variable,
                        "min-w-screen relative flex h-full min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background md:flex-row"
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
