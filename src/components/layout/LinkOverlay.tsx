import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

interface LinkOverlayProps extends PropsWithChildren, ComponentProps<typeof Link> {
    className?: string;
}

export function LinkOverlay({ className, children, ...rest }: LinkOverlayProps) {
    return (
        <Link
            {...rest}
            className={twMerge(
                "link-overlay static before:content-[''] before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-0 before:w-full before:h-full",
                className
            )}
        >
            {children}
        </Link>
    );
}
