import NextLink from "next/link";
import type {
    AnchorHTMLAttributes,
    ComponentProps,
    ForwardRefExoticComponent,
    ReactNode,
} from "react";
import { forwardRef } from "react";

import { twMerge } from "tailwind-merge";

export const Link: ForwardRefExoticComponent<ComponentProps<typeof NextLink>> = forwardRef(
    (props, ref) => <NextLink ref={ref} scroll={false} {...props} />
);

interface IExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    readonly href: string;
    readonly isFocusable?: boolean;
    readonly className?: string;
    readonly children?: ReactNode;
}

export function ExternalLink({
    href,
    isFocusable,
    className,
    children,
    ...props
}: IExternalLinkProps) {
    return (
        <a
            className={twMerge(
                "outline-none",
                isFocusable &&
                    "rounded-sm ring-text/50 transition-all hover:-translate-y-[2px] focus-visible:ring-2",
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
