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

export const AboutIcon: IconType = (props?: IconProps) => (
    // 'user' from iconic
    <Icon {...props}>
        <circle cx="12" cy="8" r="3.25" />
        <path d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z" />
    </Icon>
);

export const ProjectsIcon: IconType = (props?: IconProps) => (
    // 'stack-2' from tabler-icons
    <Icon {...props}>
        <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
        <path d="M4 12l8 4l8 -4" />
        <path d="M4 16l8 4l8 -4" />
    </Icon>
);

export const SkillsIcon: IconType = (props?: IconProps) => (
    // 'chart-bar' from tabler-icons
    <Icon {...props}>
        <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        <path d="M4 20l14 0" />
    </Icon>
);

export const ContactIcon: IconType = (props?: IconProps) => (
    // 'link' from iconic
    <Icon {...props}>
        <path d="M16.75 13.25L18 12C19.6569 10.3431 19.6569 7.65685 18 6V6C16.3431 4.34315 13.6569 4.34315 12 6L10.75 7.25" />
        <path d="M7.25 10.75L6 12C4.34315 13.6569 4.34315 16.3431 6 18V18C7.65685 19.6569 10.3431 19.6569 12 18L13.25 16.75" />
        <path d="M14.25 9.75L9.75 14.25" />
    </Icon>
);

export const StarsIcon: IconType = (props?: IconProps) => (
    // 'sparkles-2' from iconic
    <Icon {...props}>
        <path d="M17 4.75C17 5.89705 15.8971 7 14.75 7C15.8971 7 17 8.10295 17 9.25C17 8.10295 18.1029 7 19.25 7C18.1029 7 17 5.89705 17 4.75Z" />
        <path d="M17 14.75C17 15.8971 15.8971 17 14.75 17C15.8971 17 17 18.1029 17 19.25C17 18.1029 18.1029 17 19.25 17C18.1029 17 17 15.8971 17 14.75Z" />
        <path d="M9 7.75C9 9.91666 6.91666 12 4.75 12C6.91666 12 9 14.0833 9 16.25C9 14.0833 11.0833 12 13.25 12C11.0833 12 9 9.91666 9 7.75Z" />
    </Icon>
);

export const ExternalLinkIcon: IconType = (props?: IconProps) => (
    // 'share' from iconic
    <Icon {...props}>
        <path d="M9.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75" />
        <path d="M19.25 9.25V4.75H14.75" />
        <path d="M19 5L11.75 12.25" />
    </Icon>
);

export const PackageIcon: IconType = (props?: IconProps) => (
    // 'package' from tabler (flipped horizontally)
    <Icon {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M4 7.5L12 3L20 7.5M4 7.5V16.5L12 21M4 7.5L12 12M12 21L20 16.5V7.5M12 21V12M20 7.5L12 12M8 5.25L16 9.75" />
    </Icon>
);