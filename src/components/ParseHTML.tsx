import { ParseHTMLProps } from "../types";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { Element } from "domhandler/lib/node";

const options: HTMLReactParserOptions = {
    replace: (element) => {
        if (!(element instanceof Element)) return;
        // removes script tags
        if (element.name === "script") {
            return <></>;
        }
    },
    trim: true,
};

export const ParseHTML = ({ html }: ParseHTMLProps): JSX.Element => {
    // returns string, JSX.Element[], JSX.Element all as JSX.Element
    return <>{parse(html, options)}</>;
};
