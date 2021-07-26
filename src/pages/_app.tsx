import "react-tippy/dist/tippy.css";
import "../styles/globals.css";
import "../styles/index.css";

import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
