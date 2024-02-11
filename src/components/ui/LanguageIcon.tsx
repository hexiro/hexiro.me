import type { IconProps } from "@/components/ui/Icons";
import {
    PythonIcon,
    TypeScriptIcon,
    GoIcon,
    RustIcon,
    JavaScriptIcon,
} from "@/components/ui/Icons";

interface LanguageProps extends IconProps {
    readonly name: string | null;
}

export default function LanguageIcon({ name, ...iconProps }: LanguageProps) {
    if (!name) return null;

    switch (name.toLowerCase()) {
        case "python":
            return <PythonIcon {...iconProps} />;
        case "typescript":
            return <TypeScriptIcon {...iconProps} />;
        case "go":
            return <GoIcon {...iconProps} />;
        case "rust":
            return <RustIcon {...iconProps} />;
        case "javascript":
            return <JavaScriptIcon {...iconProps} />;
        default:
            return null;
    }
}
