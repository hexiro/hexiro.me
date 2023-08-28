import NextLink from "next/link";
import type { AnchorHTMLAttributes, ComponentProps, ForwardRefExoticComponent, ReactNode } from "react";
import { forwardRef } from "react";

export const Link: ForwardRefExoticComponent<ComponentProps<typeof NextLink>> = forwardRef(
    (props, ref) => <NextLink ref={ref} scroll={false} {...props} />
);

interface IExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    className?: string;
    children?: ReactNode;
}

export function ExternalLink({ className, href, children, ...props }: IExternalLinkProps) {
    return (
        <a className={className} href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
    );
}
