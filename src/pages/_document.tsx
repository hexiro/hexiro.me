import Document, { Head, Html, Main, NextScript } from "next/document";

export default class extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Hexiro" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta name="robots" content="index, follow" />
                    <meta name="theme-color" content="#5ce09a" />
                    <meta name="msapplication-TileColor" content="#191c1d" />
                    <meta name="apple-mobile-web-app-title" content="Hexiro" />
                    <meta name="application-name" content="Hexiro" />
                    <meta
                        name="keywords"
                        content="Hexiro, Hex, Hexiiro, Programmer, Software Engineer, Python"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&amp;display=swap"
                        rel="stylesheet"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5ce09a" />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        );
    }
}
