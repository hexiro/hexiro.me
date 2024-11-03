import type { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
    readonly as: HeadingTypes;
    readonly green?: boolean;
    readonly mono?: boolean;
    readonly black?: boolean;
    readonly className?: string;
    readonly children?: ReactNode;
}

type GeneralHeadingProps = Omit<HeadingProps, "as">;

function Heading({ as: Heading, green, mono, black, className, children }: HeadingProps) {
    return (
        <Heading
            className={twMerge(
                "font-sans font-extrabold text-off-white",
                green && "text-green",
                mono && "font-mono",
                black && "font-black",
                className
            )}
        >
            {children}
        </Heading>
    );
}

export function H1({ className, ...rest }: GeneralHeadingProps) {
    rest.green ??= true;
    rest.black ??= true;
    return (
        <Heading
            as="h1"
            className={twMerge("text-5xl leading-extra-tight sm:text-6xl lg:text-7xl", className)}
            {...rest}
        />
    );
}

export function H2({ className, ...rest }: GeneralHeadingProps) {
    rest.green ??= true;
    return (
        <Heading
            as="h2"
            className={twMerge("text-lg leading-[1.75] sm:text-xl lg:text-2xl", className)}
            {...rest}
        />
    );
}

export function H3({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h3" className={twMerge("text-lg lg:text-xl", className)} {...rest} />;
}

export function H4({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h4" className={twMerge("text-[18px] lg:text-base", className)} {...rest} />;
}
