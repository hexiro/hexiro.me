import "react-tippy/dist/tippy.css";

import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import theme from "theme";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

// don't delete, not done converting to chakra yet
// const GlobalStyle = createGlobalStyle`

// *:focus {
//     filter: drop-shadow(0 0 6px ${theme.accent.main});
//     outline: none;
// }

// .tippy-tooltip [x-arrow] {
//     border-top-color: ${theme.accent.background} !important;
// }

// .tippy-tooltip {
//     background-color: ${theme.accent.background} !important;
//     filter: drop-shadow(0px 6px 4px ${theme.core.background});
// }

// h2,
// h3,
// h4,
// h5,
// p {
//     font-weight: 300;
// }

// h1 {
//     font-size: 3em;
//     font-weight: 400;
// }

// h2 {
//     font-size: 2em;
// }

// h3 {
//     font-size: 1.5em;
// }

// h4 {

//     font-size: 1.1em;
// }

// h5 {
//     font-size: 1em;
// }

// p {
//     color: ${theme.core.subtext};
//     font-size: 1.25em;

//     @media only screen and (max-width: 549px) {
//         font-size: 1.1em;
//     }
// }

// `;
