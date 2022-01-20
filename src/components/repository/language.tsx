import { PythonIcon, TypeScriptIcon, GoIcon, RustIcon } from "commons/icons";

interface LanguageProps {
    name: string | null;
}

export default function Language({ name }: LanguageProps): JSX.Element | null {
    if (!name) return null;
    switch (name) {
        case "Python":
            return <PythonIcon />;
        case "TypeScript":
            return <TypeScriptIcon />;
        case "Go":
            return <GoIcon />;
        case "Rust":
            return <RustIcon />;
        default:
            return null;
    }
}
