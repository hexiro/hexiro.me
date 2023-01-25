import { Fragment } from "react";

import { Link, Paragraph, Span } from "@/components/ui";

import { Element, Text, domToReact } from "html-react-parser";
import type { DOMNode } from "html-react-parser";
import hash from "object-hash";

export default function replace(node: DOMNode): JSX.Element | null {
    const key = hash(node);

    if (node instanceof Text) {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        if (node.next || node.prev) {
            return <span key={key}>{node.data}</span>;
        }
    }

    if (node instanceof Element) {
        switch (node.name) {
            case "a": {
                return (
                    <Link key={key} href={node.attribs.href} css={{ zIndex: 1 }}>
                        <Span animation="pop" color="brand-primary">
                            {domToReact(node.children)}
                        </Span>
                    </Link>
                );
            }

            case "g-emoji":
            case "div": {
                const children = node.children.map((child) => replace(child));
                return (
                    <Paragraph key={key} css={{ minHeight: 90 }}>
                        {children}
                    </Paragraph>
                );
            }

            default:
                return <Fragment key={key}>{domToReact([node])}</Fragment>;
        }
    }

    return <Fragment key={key}>{domToReact([node])}</Fragment>;
}
