import type { ReactNode } from "react";

import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface ImageCardProps {
    readonly children: ReactNode;
    readonly className?: string;
}

export function ImageCard({ children, className }: ImageCardProps) {
    return (
        <Card
            as="div"
            className={twMerge("flex w-full shrink-0 items-center justify-center p-6", className)}
        >
            {children}
        </Card>
    );
}
