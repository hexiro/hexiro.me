import type { IconProps } from "@/commons/icons";
import { PythonIcon, TypeScriptIcon, GoIcon, RustIcon, JavaScriptIcon } from "@/commons/icons";

type LanguageProps = {
    name: string | null;
} & IconProps;

export default function LanguageIcon({ name, ...props }: LanguageProps): JSX.Element | null {
    if (!name) return null;

    switch (name.toLowerCase()) {
        case "python":
            return <PythonIcon {...props} />;
        case "typescript":
            return <TypeScriptIcon {...props} />;
        case "go":
            return <GoIcon {...props} />;
        case "rust":
            return <RustIcon {...props} />;
        case "javascript":
            return <JavaScriptIcon {...props} />;
        default:
            return null;
    }
}
