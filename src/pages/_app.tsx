import type { AppProps } from "next/app";

// import { Plus_Jakarta_Sans } from "@next/font/google";
import { globalStyles } from "theme";

// const font = Plus_Jakarta_Sans({
//     weight: "variable",
//     subsets: ["latin"],
//     style: "normal",
//     preload: true,
// });

export default function App({ Component, pageProps }: AppProps) {
    globalStyles();
    return (
        <>
            {/* <style jsx global>{`
                html {
                    font-family: ${font.style.fontFamily};
                }
            `}</style> */}
            <Component {...pageProps} />
        </>
    );
}
