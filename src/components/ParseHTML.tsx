import { To } from "components";

import { Element } from "domhandler";
import type { HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";

// Returns string, JSX.Element[], JSX.Element all as JSX.Element
export const ParseHTML = ({ html }: { html: string }): JSX.Element => <>{parse(html, options)}</>;

const options: HTMLReactParserOptions = {
    trim: true,
    replace: element => {
        if (!(element instanceof Element)) return;
        switch (element.name) {
            // Remove script
            case "script":
                return null;
            // Replace a with custom next/link
            case "a":
                return (
                    <To newTab href={element.attribs.href}>
                        {domToReact(element.children)}
                    </To>
                );
            // For github:
            // return child elements of div/emoji
            case "div":
            case "g-emoji":
                return <>{domToReact(element.children)}</>;
            default:
                break;
        }
    },
};
