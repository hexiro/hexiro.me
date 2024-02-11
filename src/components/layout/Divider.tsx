import { twMerge } from "tailwind-merge";

const commonStyles = "border-background-accent border-2 border-solid";

interface ClassNameProps {
    readonly className?: string;
}

export function HorizontalDivider({ className }: ClassNameProps) {
    return <hr className={twMerge(commonStyles, "h-0 divide-y", className)} />;
}

export function VerticalDivider({ className }: ClassNameProps) {
    return <hr className={twMerge(commonStyles, "w-0 divide-x", className)} />;
}

interface HorizontalDividerWithTextProps extends ClassNameProps {
    readonly text: string;
}

export function HorizontalDividerWithText({ text, className }: HorizontalDividerWithTextProps) {
    return (
        <div className={twMerge("flex items-center", className)}>
            <HorizontalDivider className="flex-grow" />
            <span className="px-4 font-mono text-lg font-extrabold uppercase text-[#A9A898]">
                {text}
            </span>
            <HorizontalDivider className="flex-grow" />
        </div>
    );
}
