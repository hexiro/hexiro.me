import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface CardProps<T extends ElementType> {
    readonly as?: T;
    readonly isHoverable?: boolean | "scale" | "translate-y";
    readonly isFocusable?: boolean;
    readonly className?: string;
    readonly children?: ReactNode;
}

export function Card<T extends ElementType = "div">({
    as,
    isHoverable,
    isFocusable,
    className: extraClassName,
    children,
    ...props
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
    const Component = as ?? "div";

    return (
        <Component
            {...props}
            className={twMerge(
                "group relative inline-block rounded-md border-2 border-white/10 bg-background-secondary px-8 py-6 shadow-lg outline-none",
                isHoverable && "transition-all duration-[225ms] ease-in-out",
                (isHoverable === true || isHoverable === "translate-y") &&
                    "hover:-translate-y-[5px]",
                (isHoverable === true || isHoverable === "scale") &&
                    "hover:scale-102 active:scale-98",
                isFocusable &&
                    "ring-text/25 transition-all duration-fast focus-visible:-translate-y-[5px] focus-visible:scale-102 focus-visible:ring-[3px] active:scale-98 [&:has(:focus-visible)]:-translate-y-[5px] [&:has(:focus-visible)]:scale-102 [&:has(:focus-visible)]:ring-[3px]",
                (isHoverable ?? isFocusable) && "transform-gpu",
                extraClassName
            )}
        >
            {children}
        </Component>
    );
}

export function SecondaryCard<T extends ElementType = "div">({
    as,
    className,
    children,
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
    const Component = as ?? "div";

    return (
        <Component
            className={twMerge(
                "relative inline-block rounded-[4px] border-2 border-white/10 bg-white/5 p-5 shadow-sm",
                className
            )}
        >
            {children}
        </Component>
    );
}
