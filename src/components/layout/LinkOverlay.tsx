import Link from "next/link";
import type { ComponentProps, PropsWithChildren } from "react";

import { ExternalLink } from "@/components/ui/ExternalLink";

import { twMerge } from "tailwind-merge";

interface ILinkOverlayProps extends PropsWithChildren, ComponentProps<typeof Link> {
    className?: string;
}

interface IExternalLinkProps extends PropsWithChildren {
    href: string;
    className?: string;
}

const commonStyles =
    "static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-0 before:w-full before:h-full";

export function LinkOverlay({ className, children, ...rest }: ILinkOverlayProps) {
    return (
        <Link {...rest} className={twMerge(commonStyles, className)}>
            {children}
        </Link>
    );
}

export function ExternalLinkOverlay({ className, href, children }: IExternalLinkProps) {
    return (
        <ExternalLink href={href} className={twMerge(commonStyles, className)}>
            {children}
        </ExternalLink>
    );
}
