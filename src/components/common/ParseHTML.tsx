import { ParseHTMLProps } from "types";

import { To } from "components/common";

import { Element } from "domhandler";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";

export const ParseHTML = ({ html }: ParseHTMLProps): JSX.Element => {
    // returns string, JSX.Element[], JSX.Element all as JSX.Element
    return <>{parse(html, options)}</>;
};

const options: HTMLReactParserOptions = {
    replace: element => {
        if (!(element instanceof Element)) return;
        if (element.name === "script") {
            return <></>;
        }
        if (element.name === "a") {
            return <To href={element.attribs.href}>{domToReact(element.children)}</To>;
        }
        // g(ithub)-emoji
        if (element.name === "g-emoji") {
            return <>{domToReact(element.children)}</>;
        }
    },
    trim: true,
};
