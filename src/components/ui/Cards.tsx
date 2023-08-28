import type { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface CardProps<T extends React.ElementType> {
    as?: T;
    isHoverable?: boolean;
    isFocusable?: boolean;
    className?: string;
    children?: ReactNode;
}

export function Card<T extends React.ElementType = "div">({
    as,
    isHoverable,
    isFocusable,
    className: extraClassName,
    children,
    ...props
}: CardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
    const Component = as ?? "div";

    return (
        <Component
            role="group"
            {...props}
            className={twMerge(
                "group relative inline-block rounded-md border-2 border-white/10 bg-background-secondary px-8 py-6 shadow-lg",
                isHoverable &&
                    "transition-all duration-[225ms] ease-in-out hover:-translate-y-[5px] hover:scale-102 active:scale-98",
                isFocusable &&
                    "ring-text/25 transition-all duration-fast focus-visible:outline-none active:scale-98 [&:has(:focus-visible)]:-translate-y-[5px] [&:has(:focus-visible)]:scale-102 [&:has(:focus-visible)]:ring-[3px]",
                extraClassName
            )}
        >
            {children}
        </Component>
    );
}

export function SecondaryCard<T extends React.ElementType = "div">({
    as,
    className,
    children,
}: CardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
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
