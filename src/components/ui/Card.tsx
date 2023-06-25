import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type CardProps = PropsWithChildren<{ className?: string }>;

export default function Card({ className, children }: CardProps) {
    return (
        <div
            className={twMerge(
                "bg-background-secondary rounded-md border-2 border-white/10 shadow-md p-8",
                className
            )}
        >
            {children}
        </div>
    );
}
