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
            className={twMerge("grid w-full shrink-0 place-items-center p-6 grid-flow-col", className)}
        >
            {children}
        </Card>
    );
}
