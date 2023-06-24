import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const commonStyles = "border-background-accent border-2 border-solid";

export function HorizontalDivider({ className }: { className?: string }) {
    return <hr className={twMerge(commonStyles, "divide-y h-0", className)} />;
}

export function VerticalDivider({ className }: { className?: string }) {
    return <hr className={clsx(commonStyles, "divide-x w-0", className)} />;
}
