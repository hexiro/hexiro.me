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

const commonClassName =
    "static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-0 before:w-full before:h-full focus-visible:outline-none";

export function LinkOverlay({
    className,
    children,
    ...props
}: PropsWithChildren<LinkOverlayProps>) {
    return (
        <Link {...props} className={twMerge(commonClassName, className)}>
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
        <ExternalLink tabIndex={-1} href={href} className={twMerge(commonClassName, className)}>
            {children}
        </ExternalLink>
    );
}
