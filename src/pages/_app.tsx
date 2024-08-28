import type { AppProps } from "next/app";
import { Golos_Text as GolosText, Noto_Sans_Mono as NotoSansMono } from "next/font/google";

import Content from "@/layout/Content";
import Header from "@/layout/Header";
import Meta from "@/layout/Meta";
import Page from "@/layout/Page";
import { PageNextNavigation, PagePrevNavigation } from "@/layout/PageEndNavigation";
import PageTransition from "@/layout/PageTransition";
import "@/styles/globals.css";

const sansFont = GolosText({
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
            <Meta sansFont={sansFont} />
            <Page fonts={[sansFont, monospaceFont]}>
                <Header />
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
