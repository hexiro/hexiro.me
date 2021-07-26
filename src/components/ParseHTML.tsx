import { ParseHTMLProps } from "../types";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Element } from "domhandler/lib/node";
import Link from "next/link";

const options: HTMLReactParserOptions = {
    replace: (element) => {
        if (!(element instanceof Element)) return;
        if (element.name === "script") {
            return <></>;
        }
        if (element.name === "a") {
            return (
                <Link href={element.attribs.href}>
                    <a rel="noreferrer" target="_blank">
                        {domToReact(element.children)}
                    </a>
                </Link>
            );
        }
    },
    trim: true,
};

export const ParseHTML = ({ html }: ParseHTMLProps): JSX.Element => {
    // returns string, JSX.Element[], JSX.Element all as JSX.Element
    return <>{parse(html, options)}</>;
};
