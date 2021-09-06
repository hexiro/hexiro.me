import { AppProps } from "next/app";

import theme from "data/theme";

import { createGlobalStyle } from "styled-components";

import "react-tippy/dist/tippy.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

const GlobalStyle = createGlobalStyle`
::-webkit-scrollbar {
    width: 0.5em;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${theme.core.scrollbar};
}

*:focus {
    filter: drop-shadow(0 0 6px ${theme.accent.main});
    outline: none;
}

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.tippy-tooltip [x-arrow] {
    border-top-color: ${theme.accent.background} !important;
}

.tippy-tooltip {
    background-color: ${theme.accent.background} !important;
    filter: drop-shadow(0px 6px 4px ${theme.core.background});
}

body {
    background: ${theme.core.background};
    color: ${theme.core.text};
    font-family: "Poppins", sans-serif;
    font-weight: 200;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 300;
}

h1 {
    font-size: 2.75em;
}

h2 {
    font-size: 2em;
}

h3 {
    font-size: 1.5em;
}

h4 {
    font-size: 1em;
}

h5 {
    font-size: 0.9em;
}

p {
    color: ${theme.core.text};
    font-weight: 200;
}

ul {
    list-style: none;
}

svg {
    width: auto;
    height: 100%;
    color: ${theme.core.main};
}
`;
