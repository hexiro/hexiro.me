import { To } from "components/common";

import { Element } from "domhandler";
import type { DOMNode, HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";

// Returns string, JSX.Element[], JSX.Element all as JSX.Element
export const ParseHTML = ({ html }: { html: string }): JSX.Element => <>{parse(html, options)}</>;

const options: HTMLReactParserOptions = {
    trim: true,
    replace: (element: DOMNode) => {
        if (!(element instanceof Element)) return;
        switch (element.name) {
            case "script":
            case "style":
                return null;
            // Replace a with custom next/link
            case "a":
                return <To href={element.attribs.href}>{domToReact(element.children)}</To>;
            // For github:
            case "div":
                const children: DOMNode[] = [];

                for (const child of element.children) {
                    if (child instanceof Element && child.name === "g-emoji") {
                        child.children.map(x => children.push(x));
                        continue;
                    }
                    children.push(child);
                }

                return <>{domToReact(children)}</>;
            default:
                break;
        }
    },
};
