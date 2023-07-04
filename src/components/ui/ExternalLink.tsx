import type { PropsWithChildren } from "react";

interface IExternalLinkProps extends PropsWithChildren {
    href: string;
    className?: string;
}

export function ExternalLink({ className, href, children }: IExternalLinkProps) {
    return (
        <a className={className} href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}
