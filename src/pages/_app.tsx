import { AppProps } from "next/app";

import theme from "commons/theme";

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

html {
    scroll-behavior: smooth;
}

body {
    background: ${theme.core.background};
    color: ${theme.core.text};
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-size: 16px;
    overflow-x: hidden;
}

h2,
h3,
h4,
h5,
p {
    font-weight: 300;
}

h1 {
    font-size: 3em;
    font-weight: 400;
}

h2 {
    font-size: 2em;
}

h3 {
    font-size: 1.5em;
}

h4 {

    font-size: 1.1em;
}

h5 {
    font-size: 1em;
}

p {
    color: ${theme.core.subtext};
    font-size: 1.25em;
}

ul {
    list-style: none;
}

svg {
    width: auto;
    height: 100%;
    color: ${theme.core.main};
}

a {
    text-decoration: unset;
    color: ${theme.core.main};
}
`;
