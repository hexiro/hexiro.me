import { twMerge } from "tailwind-merge";

const commonStyles = "border-background-accent border-2 border-solid";

export function HorizontalDivider({ className }: { className?: string }) {
    return <hr className={twMerge(commonStyles, "divide-y h-0", className)} />;
}

export function VerticalDivider({ className }: { className?: string }) {
    return <hr className={twMerge(commonStyles, "divide-x w-0", className)} />;
}

export function HorizontalDividerWithText({
    text,
    className,
}: {
    text: string;
    className?: string;
}) {
    return (
        <div className={twMerge("flex items-center", className)}>
            <HorizontalDivider className="flex-grow" />
            <span className="px-4 text-background-accent font-mono font-extrabold text-lg">
                {text}
            </span>
            <HorizontalDivider className="flex-grow" />
        </div>
    );
}
