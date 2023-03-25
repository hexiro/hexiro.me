import { getCssText } from "@/theme";

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <style dangerouslySetInnerHTML={{ __html: getCssText() }} id="stitches" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
