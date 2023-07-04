import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface IHeadingProps extends PropsWithChildren {
    as: HeadingTypes;
    size: string;
    green?: boolean;
    mono?: boolean;
    black?: boolean;
    className?: string;
}

type GeneralHeadingProps = Omit<IHeadingProps, "as" | "size">;

const SIZE_MAP = {
    h1: "text-7xl",
    h2: "text-3xl",
    h3: "text-xl",
    h4: "text-[28px]",
    h5: "text-lg",
    h6: "text-base",
} as const;

function Heading({ as: Heading, size, green, mono, black, className, children }: IHeadingProps) {
    return (
        <Heading
            className={twMerge(
                "font-sans font-extrabold text-off-white",
                green && "text-green",
                mono && "font-mono",
                black && "font-black",
                size,
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
    return <Heading as="h1" size={SIZE_MAP.h1} className={className} {...rest} />;
}

export function H2({ className, ...rest }: GeneralHeadingProps) {
    rest.green ??= true;
    rest.black ??= true;
    return <Heading as="h2" size={SIZE_MAP.h2} className={className} {...rest} />;
}

export function H3({ className, ...rest }: GeneralHeadingProps) {
    rest.green ??= true;
    return <Heading as="h3" size={SIZE_MAP.h3} className={className} {...rest} />;
}

export function H4({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h4" size={SIZE_MAP.h4} className={className} {...rest} />;
}

export function H5({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h5" size={SIZE_MAP.h5} className={className} {...rest} />;
}

export function H6({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h6" size={SIZE_MAP.h6} className={className} {...rest} />;
}
