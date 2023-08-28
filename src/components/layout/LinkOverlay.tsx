import type { ComponentProps, PropsWithChildren } from "react";

import { ExternalLink, Link } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

interface ILinkOverlayProps extends PropsWithChildren, ComponentProps<typeof Link> {
    className?: string;
}

interface IExternalLinkProps extends PropsWithChildren {
    href: string;
    className?: string;
}

const commonClassName =
    "static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-0 before:w-full before:h-full focus-visible:outline-none";

export function LinkOverlay({ className, children, ...props }: ILinkOverlayProps) {
    return (
        <Link {...props} className={twMerge(commonClassName, className)}>
            {children}
        </Link>
    );
}

export function ExternalLinkOverlay({ className, href, children }: IExternalLinkProps) {
    return (
        <ExternalLink href={href} className={twMerge(commonClassName, className)}>
            {children}
        </ExternalLink>
    );
}
