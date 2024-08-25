import type { ComponentProps, PropsWithChildren } from "react";

import { ExternalLink, Link } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

interface LinkOverlayProps extends ComponentProps<typeof Link> {
    readonly "aria-label": string;
    readonly className?: string;
}

interface ExternalLinkProps extends ComponentProps<typeof Link> {
    readonly href: string;
    readonly "aria-label": string;
    readonly className?: string;
}

const COMMON_CLASS_NAMES =
    "static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-[5] before:w-full before:h-full focus-visible:outline-none";

export function LinkOverlay({
    className,
    children,
    ...props
}: PropsWithChildren<LinkOverlayProps>) {
    return (
        <Link className={twMerge(COMMON_CLASS_NAMES, className)} {...props}>
            {children}
        </Link>
    );
}

export function ExternalLinkOverlay({
    className,
    href,
    children,
    ...props
}: PropsWithChildren<ExternalLinkProps>) {
    return (
        <ExternalLink
            tabIndex={-1}
            href={href}
            className={twMerge(COMMON_CLASS_NAMES, className)}
            {...props}
        >
            {children}
        </ExternalLink>
    );
}
