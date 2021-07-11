import Document, { Head, Html, NextScript, Main } from "next/document";

export default class extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta name="theme-color" content="#5ce09a" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&amp;display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        name="keywords"
                        content="Hexiro, Hex, Hexiiro, Programmer, Software Engineer, Python"
                    />
                </Head>
                <body>
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </Html>
        );
    }
}
