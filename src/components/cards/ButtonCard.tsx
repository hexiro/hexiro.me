import type { ComponentProps } from "react";

import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface ContactCardProps {
    readonly className?: string;
}

export default function ButtonCard({
    className,
    children,
    ...props
}: ContactCardProps & ComponentProps<typeof Card<"button">>) {
    return (
        <Card
            isFocusable
            isHoverable="translate-y"
            as="button"
            className={twMerge(
                "bg-background-gray-accent py-2 font-mono text-sm font-bold uppercase text-text",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    );
}
