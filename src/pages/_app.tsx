import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";

import "@/styles/globals.css";

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
        <main
            className={clsx(
                sansSerifFont.variable,
                monospaceFont.variable,
                "bg-background relative flex flex-col min-h-screen min-w-screen h-full w-full"
            )}
        >
            <Component key={router.pathname} {...pageProps} />
        </main>
    );
}
