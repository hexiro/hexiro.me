import { globalStyles } from "@/theme";

import type { AppProps } from "next/app";

// import { Plus_Jakarta_Sans } from "@next/font/google";

// const font = Plus_Jakarta_Sans({
//     weight: "variable",
//     subsets: ["latin"],
//     style: "normal",
//     preload: true,
// });

export default function App({ Component, pageProps }: AppProps) {
    globalStyles();
    return <Component {...pageProps} />;
}
