import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";
import Script from "next/script";

import Nav from "@/layout/Nav";
import Page from "@/layout/Page";
import { PageNextNavigation, PagePrevNavigation } from "@/layout/PageEndNavigation";
import PageTransition from "@/layout/PageTransition";
import { GlobalSeo } from "@/layout/Seo";
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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Meta />
            <Page cssVariables={[sansSerifFont.variable, monospaceFont.variable]}>
                <Nav />
                <Content>
                    <PageTransition>
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
            <GlobalSeo />
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
