import { globalStyles, tippyStyles, styled } from "@/theme";

import type { AppProps } from "next/app";

import NoScript from "@/components/NoScript";

import Nav from "@/layout/Nav";
import { GlobalSEO } from "@/layout/SEO";

import { Provider as JotaiProvider } from "jotai";

export default function App({ Component, pageProps, router }: AppProps) {
    globalStyles();
    tippyStyles();

    // const isHome = router.pathname === "/";

    return (
        <JotaiProvider>
            <GlobalSEO />
            <NoScript />
            <Main>
                <Nav />
                <Component {...pageProps} />
            </Main>
        </JotaiProvider>
    );
}

const Main = styled("main", {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    minHeight: "100vh",
    minWidth: "100vw",
    scrollBehavior: "smooth",

    "&::before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "$background-primary",
        backgroundRepeat: "repeat",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
        maskImage:
            "linear-gradient(270deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0.7) 25%, rgba(0, 0, 0, 0.5) 90%, rgba(255, 255, 255, 0.7) 100%)",
        zIndex: -1,
    },
});
