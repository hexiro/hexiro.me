import { AppProps } from "next/app";

import theme from "data/theme";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import "react-tippy/dist/tippy.css";
import "styles/index.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
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
    background-color: ${({ theme }) => theme.core.scrollbar};
}

*:focus {
    filter: drop-shadow(0 0 6px ${({ theme }) => theme.accent.main});
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
    border-top-color: ${({ theme }) => theme.accent.background} !important;
}

.tippy-tooltip {
    background-color: ${({ theme }) => theme.accent.background} !important;
    filter: drop-shadow(0px 6px 4px ${({ theme }) => theme.core.background});
}

.transition {
    transition: ease all 0.5s;
}

.full-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.opacity-100 {
    opacity: 1;
}

.text-color {
    color: ${({ theme }) => theme.core.text};
}

.main-color {
    color: ${({ theme }) => theme.core.main};
}

.main-accent {
    color: ${({ theme }) => theme.accent.main};
}

.dark-color {
    color: ${({ theme }) => theme.accent.background};
}

.text-center {
    text-align: center;
}

.text-right {
    text-align: right;
}

.text-left {
    text-align: left;
}

.text-start {
    text-align: start;
}

/* DISPLAY */
.display-block {
    display: block;
}

.display-flex {
    display: flex;
}

.display-inline-block {
    display: inline-block;
}

.display-inline-flex {
    display: inline-flex;
}

.display-table {
    display: table;
}

.display-table-cell {
    display: table-cell;
}

/* JUSTIFY CONTENT */
.justify-content-center {
    justify-content: center;
}

/* ALIGN ITEMS */
.align-items-center {
    align-items: center;
}

/* TEXT SIZE */
.text-smallest {
    font-size: 0.5em;
}

.text-small {
    font-size: 0.75em;
}

.text-default {
    font-size: 1em;
}

.text-slightly-larger {
    font-size: 1.25em;
}

.text-medium {
    font-size: 1.5em;
}

.text-large {
    font-size: 2em;
}

.text-largest {
    font-size: 2.5em;
}

/* FONT WEIGHT */
.font-weight-200 {
    font-weight: 200;
}

.font-weight-300 {
    font-weight: 300;
}

.font-weight-400 {
    font-weight: 400;
}

.font-weight-500 {
    font-weight: 500;
}

.no-user-select {
    user-select: none;
}

.to-upper {
    text-transform: uppercase;
}

.to-lower {
    text-transform: lowercase;
}

.capitalize {
    text-transform: capitalize;
}

body {
    background: ${({ theme }) => theme.core.background};
    color: ${({ theme }) => theme.core.text};
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
    color: ${({ theme }) => theme.core.text};
    font-weight: 200;
}

a {
    color: ${({ theme }) => theme.core.main};
    text-decoration: none;
    opacity: 0.7;
    font-weight: 300;
    transition: all ease 0.2s;
}

a:hover {
    opacity: 0.9;
}

ul {
    list-style: none;
}

svg {
    width: auto;
    height: 100%;
    color: ${({ theme }) => theme.core.main};
}
`;
