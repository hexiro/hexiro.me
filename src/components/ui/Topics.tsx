import type { ButtonHTMLAttributes } from "react";

import LanguageIcon from "@/components/ui/LanguageIcon";

import { twMerge } from "tailwind-merge";

interface TopicProps {
    readonly name: string;
    readonly isLanguage?: boolean;
}

const COMMON_CLASS_NAMES =
    "relative flex flex-row items-center rounded-[0.25rem] border-2 border-solid border-white/10 bg-background-light-accent px-2 py-1 font-sans text-sm font-bold leading-none text-text";

export function Topic({ name, isLanguage }: TopicProps) {
    return (
        <li className={twMerge(COMMON_CLASS_NAMES, isLanguage && "gap-x-1")}>
            {isLanguage ? <LanguageIcon name={name} className="h-3.5 w-3.5" /> : null}
            {name}
        </li>
    );
}

interface TopicButtonProps {
    readonly name: string;
    readonly isSelected?: boolean;
}

export function TopicButton({
    name,
    isSelected,
    className,
    ...props
}: TopicButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <li className="contents">
            <button
                type="button"
                className={twMerge(
                    COMMON_CLASS_NAMES,
                    "uppercase outline-none ring-white/20 transition-all duration-100 ease-in-out will-change-transform focus-visible:ring-2 active:scale-95",
                    isSelected && "border-black/40 bg-green text-black/75 ring-green/40",
                    className
                )}
                {...props}
            >
                {name}
            </button>
        </li>
    );
}
