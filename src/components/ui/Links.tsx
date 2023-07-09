import NextLink from "next/link";
import type { ComponentProps, ForwardRefExoticComponent, PropsWithChildren } from "react";
import { forwardRef } from "react";

export const Link: ForwardRefExoticComponent<ComponentProps<typeof NextLink>> = forwardRef(
    (props, ref) => <NextLink ref={ref} scroll={false} {...props} />
);

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
