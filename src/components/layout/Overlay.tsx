import type {
    ButtonHTMLAttributes,
    ComponentProps,
    DetailedHTMLProps,
    HTMLAttributes,
    MouseEventHandler,
    PropsWithChildren,
} from "react";

import { ExternalLink, Link } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

const COMMON_CLASS_NAMES =
    "static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-[5] before:w-full before:h-full focus-visible:outline-none";

interface LinkOverlayProps extends ComponentProps<typeof Link> {
    readonly "aria-label": string;
    readonly className?: string;
}

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

interface ExternalLinkOverlayProps extends ComponentProps<typeof Link> {
    readonly href: string;
    readonly "aria-label": string;
    readonly className?: string;
}

export function ExternalLinkOverlay({
    className,
    href,
    children,
    ...props
}: PropsWithChildren<ExternalLinkOverlayProps>) {
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

interface ButtonOverlayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    readonly "aria-label": string;
    readonly className?: string;
    readonly onClick: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonOverlay({ className, children, onClick, ...props }: ButtonOverlayProps) {
    return (
        <button
            type="button"
            {...props}
            // z-10 outline-none  truncate font-mono font-bold normal-case text-text
            // static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-[5] before:w-full before:h-full focus-visible:outline-none
            // static before:cursor-inherit before:block before:absolute before:top-0 before:left-0 before:z-[5] before:w-full before:h-full focus-visible:outline-none";
            className={twMerge(className, COMMON_CLASS_NAMES)}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
