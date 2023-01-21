import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

const Icon = styled("svg", {
    color: "$brand-primary",
    strokeWidth: 2,
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",

    defaultVariants: {
        size: "md",
    },

    variants: {
        size: {
            sm: {
                width: 16,
                height: 16,
                "@md": {
                    width: 20,
                    height: 20,
                },
            },
            md: {
                width: 24,
                height: 24,
                "@md": {
                    width: 28,
                    height: 28,
                },
            },
            lg: {
                width: 28,
                height: 28,
                "@md": {
                    width: 32,
                    height: 32,
                },
            },
            xl: {
                width: 36,
                height: 36,
                "@md": {
                    width: 40,
                    height: 40,
                },
            },
            "2xl": {
                width: 44,
                height: 44,
                "@md": {
                    width: 48,
                    height: 48,
                },
            },
        },
    },
});

export type IconType = typeof TwitterIcon;
export type IconProps = ComponentProps<typeof Icon>;

export const TwitterIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
    </Icon>
);

export const GitHubIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </Icon>
);

export const LinkedInIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8" y2="8.01" />
        <line x1="12" y1="16" x2="12" y2="11" />
        <path d="M16 16v-3a2 2 0 0 0 -4 0" />
    </Icon>
);

export const HomeIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <polyline points="5 12 3 12 12 3 21 12 19 12" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Icon>
);

export const ProjectsIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <polyline points="7 8 3 12 7 16" />
        <polyline points="17 8 21 12 17 16" />
        <line x1="14" y1="4" x2="10" y2="20" />
    </Icon>
);

export const SkillsIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <circle cx="12" cy="9" r="6" />
        <path d="M12.002 15.003l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" />
        <path d="M6.802 12.003l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />
    </Icon>
);

export const DashboardIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M7 20h10" />
        <path d="M9 16v4" />
        <path d="M15 16v4" />
        <path d="M9 12v-4" />
        <path d="M12 12v-1" />
        <path d="M15 12v-2" />
        <path d="M12 12v-1" />
    </Icon>
);

export const HamburgerMenuIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </Icon>
);

export const CloseIcon = (props?: IconProps) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
);
