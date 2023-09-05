import { twMerge } from "tailwind-merge";

const commonStyles = "border-background-accent border-2 border-solid";

export function HorizontalDivider({ className }: { readonly className?: string }) {
    return <hr className={twMerge(commonStyles, "h-0 divide-y", className)} />;
}

export function VerticalDivider({ className }: { readonly className?: string }) {
    return <hr className={twMerge(commonStyles, "w-0 divide-x", className)} />;
}

export function HorizontalDividerWithText({
    text,
    className,
}: {
    readonly text: string;
    readonly className?: string;
}) {
    return (
        <div className={twMerge("flex items-center", className)}>
            <HorizontalDivider className="flex-grow" />
            <span className="px-4 font-mono text-lg font-extrabold uppercase text-background-accent">
                {text}
            </span>
            <HorizontalDivider className="flex-grow" />
        </div>
    );
}
