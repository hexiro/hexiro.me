import NextLink from "next/link";
import type {
    AnchorHTMLAttributes,
    ComponentProps,
    ForwardRefExoticComponent,
    ReactNode,
} from "react";
import { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

interface LinksProps extends ComponentProps<typeof NextLink> {
    readonly "aria-label": string;
}

export const Link: ForwardRefExoticComponent<LinksProps> = forwardRef((props, ref) => (
    <NextLink ref={ref} scroll={false} {...props} />
));

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    readonly href: string;
    readonly "aria-label": string;
    readonly isFocusable?: boolean;
    readonly isHoverable?: boolean;
    readonly className?: string;
    readonly children?: ReactNode;
}

export function ExternalLink({
    href,
    isFocusable,
    isHoverable,
    className,
    children,
    ...props
}: ExternalLinkProps) {
    return (
        <a
            className={twMerge(
                "z-10 outline-none",
                isFocusable && "rounded-sm ring-text/50 transition-all focus-visible:ring-2",
                isHoverable && "transition-all hover:-translate-y-[2px]",
                className
            )}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {children}
        </a>
    );
}
