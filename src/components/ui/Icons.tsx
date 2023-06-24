/*
 * tabler:   https://tabler-icons.io
 * iconic:   https://iconic.app
 * feather:  https://feathericons.com
 */
import type { PropsWithChildren } from "react";

import clsx from "clsx";

export type IconType = (props?: IconProps) => JSX.Element;
export type IconProps = PropsWithChildren<{
    className?: string;
}>;

const Icon = ({ children, className }: IconProps) => (
    <svg
        viewBox="0 0 24 24"
        className={clsx("text-green stroke-2 stroke-current fill-none w-6 h-6", className)}
    >
        {children}
    </svg>
);

const SimpleIcon = ({ children, className }: IconProps) => (
    <svg
        viewBox="0 0 24 24"
        className={clsx("text-green stroke-none fill-green w-6 h-6", className)}
    >
        {children}
    </svg>
);

export const ArrowUpIcon = (props?: IconProps) => (
    <Icon {...props}>
        <path d="M12 5l0 14" />
        <path d="M16 9l-4 -4" />
        <path d="M8 9l4 -4" />
    </Icon>
);

export const ArrowDownIcon = (props?: IconProps) => (
    <Icon {...props}>
        <path d="M12 5l0 14" />
        <path d="M16 15l-4 4" />
        <path d="M8 15l4 4" />
    </Icon>
);
