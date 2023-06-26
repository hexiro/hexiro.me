import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type CardProps = PropsWithChildren<{ className?: string }>;

export function Card({ className, children }: CardProps) {
    return (
        <div
            className={twMerge(
                "bg-background-secondary inline-block rounded-md border-2 border-white/10 shadow-md p-8",
                className
            )}
        >
            {children}
        </div>
    );
}

export function SecondaryCard({ className, children }: CardProps) {
    return (
        <div
            className={twMerge(
                "bg-white/5 inline-block rounded-[4px] border-2 border-white/10 shadow-sm p-5",
                className
            )}
        >
            {children}
        </div>
    );
}
