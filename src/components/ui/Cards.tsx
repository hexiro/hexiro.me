import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

interface CardProps extends PropsWithChildren {
    isHoverable?: boolean;
    className?: string;
    as?: "div" | "li";
}

export function Card({ isHoverable, className, children, as: As = "div" }: CardProps) {
    return (
        <As
            className={twMerge(
                "relative inline-block rounded-md border-2 border-white/10 bg-background-secondary px-8 py-6 shadow-md",
                isHoverable &&
                    "hover:perspective-800px transition-transform duration-[375ms] ease-in-out hover:rotate-[-1deg] hover:scale-105 active:scale-[.97]",
                className
            )}
        >
            {children}
        </As>
    );
}

export function SecondaryCard({ className, children, as: As = "div" }: CardProps) {
    return (
        <As
            className={twMerge(
                "relative inline-block rounded-[4px] border-2 border-white/10 bg-white/5 p-5 shadow-sm",
                className
            )}
        >
            {children}
        </As>
    );
}
