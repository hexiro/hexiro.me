import type { AppProps } from "next/app";

import NoScript from "@/components/NoScript";

import "@/css/globals.css";
import { GlobalSeo } from "@/layout/Seo";

import { Analytics } from "@vercel/analytics/react";
import { Provider as JotaiProvider } from "jotai";

export default function App({ Component, pageProps, router }: AppProps) {
    return (
        <>
            <Analytics />
            <JotaiProvider>
                <GlobalSeo />
                <Component key={router.pathname} {...pageProps} />
                <NoScript />
            </JotaiProvider>
        </>
    );
}
