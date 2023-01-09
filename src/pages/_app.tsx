import type { AppProps } from "next/app";
import { globalStyles } from "theme";

export default function App({ Component, pageProps }: AppProps) {
    globalStyles();
    return <Component {...pageProps} />;
}
