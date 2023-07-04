import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

interface CardProps extends PropsWithChildren {
    isHoverable?: boolean;
    className?: string;
}

export function Card({ isHoverable, className, children }: CardProps) {
    return (
        <div
            className={twMerge(
                "relative bg-background-secondary inline-block rounded-md border-2 border-white/10 shadow-md px-8 py-6",
                isHoverable &&
                    "transition-transform duration-[375ms] ease-in-out hover:perspective-800px hover:rotate-[-1deg] hover:scale-105 active:scale-[.97]",
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
                "relative bg-white/5 inline-block rounded-[4px] border-2 border-white/10 shadow-sm p-5",
                className
            )}
        >
            {children}
        </div>
    );
}