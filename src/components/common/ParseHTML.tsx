import { Fragment } from "react";

import { Link } from "components/common";
import { Element, Text } from "domhandler";
import type { DOMNode, HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import hash from "object-hash";

// Returns string, JSX.Element[], JSX.Element all as JSX.Element
export const ParseHTML = ({ html }: { html: string }): JSX.Element => <>{parse(html, options)}</>;

const replace = (node: DOMNode): JSX.Element | null => {
    const key = hash(node);

    if (node instanceof Text) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        if (node.next || node.prev) {
            return <span key={key}>{node.data}</span>;
        }
    }

    if (node instanceof Element) {
        switch (node.name) {
            // Replace a with custom link
            case "a": {
                return (
                    <Link key={key} hasAnimation href={node.attribs.href}>
                        {domToReact(node.children)}
                    </Link>
                );
            }

            case "g-emoji":
            case "div": {
                const children = node.children.map((child) => replace(child));
                return <Fragment key={key}>{children}</Fragment>;
            }

            default:
                return <Fragment key={key}>{domToReact([node])}</Fragment>;
        }
    }

    return <Fragment key={key}>{domToReact([node])}</Fragment>;
};

const options: HTMLReactParserOptions = {
    trim: true,
    replace,
};
