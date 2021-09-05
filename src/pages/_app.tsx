import { AppProps } from "next/app";

import "react-tippy/dist/tippy.css";
import "styles/globals.css";
import "styles/index.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />;
}
