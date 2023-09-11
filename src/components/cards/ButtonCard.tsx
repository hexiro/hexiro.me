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
            as="button"
            className={twMerge(
                "bg-background-gray-accent font-mono text-sm font-bold uppercase text-text py-1",
                className
            )}
            {...props}
        >
            {children}
        </Card>
    );
}
