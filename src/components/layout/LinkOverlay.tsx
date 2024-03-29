import type { ComponentProps, PropsWithChildren } from "react";

import { ExternalLink, Link } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

interface LinkOverlayProps extends ComponentProps<typeof Link> {
    readonly className?: string;
}

interface ExternalLinkProps {
    readonly href: string;
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
        <Link {...props} className={twMerge(COMMON_CLASS_NAMES, className)}>
            {children}
        </Link>
    );
}

export function ExternalLinkOverlay({
    className,
    href,
    children,
}: PropsWithChildren<ExternalLinkProps>) {
    return (
        <ExternalLink tabIndex={-1} href={href} className={twMerge(COMMON_CLASS_NAMES, className)}>
            {children}
        </ExternalLink>
    );
}
