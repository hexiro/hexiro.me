import type { HTMLReactParserOptions } from "html-react-parser";
import parse from "html-react-parser";

interface ParseHTMLProps {
    html: string;
    replace: NonNullable<HTMLReactParserOptions["replace"]>;
}

export default function ParseHTML({ html, replace }: ParseHTMLProps) {
    return (
        <>
            {parse(html, {
                trim: true,
                replace,
            })}
        </>
    );
}
