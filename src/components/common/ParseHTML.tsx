import { To } from "components/common";

import { Element } from "domhandler";
import type { DOMNode, HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";

// Returns string, JSX.Element[], JSX.Element all as JSX.Element
export const ParseHTML = ({ html }: { html: string }): JSX.Element => <>{parse(html, options)}</>;

const replace = (element: DOMNode): JSX.Element | null => {
    if (element instanceof Element)
        switch (element.name) {
            case "script": {
                return null;
            }

            case "style": {
                return null;
            }

            // Replace a with custom link
            case "a": {
                return <To href={element.attribs.href}>{domToReact(element.children)}</To>;
            }

            case "g-emoji":
                return <>{domToReact(element.children)}</>;

            case "div": {
                const children = element.children.map(child => replace(child));
                // eslint-disable-next-line react/jsx-no-useless-fragment
                return <>{children}</>;
            }

            default:
                break;
        }

    return <>{domToReact([element])}</>;
};

const options: HTMLReactParserOptions = {
    trim: true,
    replace,
};
