import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface IHeadingProps extends PropsWithChildren {
    as: HeadingTypes;
    green?: boolean;
    mono?: boolean;
    black?: boolean;
    className?: string;
}

type GeneralHeadingProps = Omit<IHeadingProps, "as">;

function Heading({ as: Heading, green, mono, black, className, children }: IHeadingProps) {
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
            className={twMerge(
                "text-5xl leading-extra-tight sm:text-6xl sm:leading-snug lg:text-7xl lg:leading-normal",
                className
            )}
            {...rest}
        />
    );
}

export function H2({ className, ...rest }: GeneralHeadingProps) {
    rest.green ??= true;
    rest.black ??= true;
    return (
        <Heading
            as="h2"
            className={twMerge("text-xl sm:text-2xl lg:text-3xl", className)}
            {...rest}
        />
    );
}

export function H3({ className, ...rest }: GeneralHeadingProps) {
    rest.green ??= true;
    return (
        <Heading
            as="h3"
            className={twMerge("text-lg sm:text-xl lg:text-2xl", className)}
            {...rest}
        />
    );
}

export function H4({ className, ...rest }: GeneralHeadingProps) {
    return (
        <Heading
            as="h4"
            className={twMerge("text-base sm:text-lg lg:text-xl", className)}
            {...rest}
        />
    );
}

export function H5({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h5" className={twMerge("md:text-md text-base", className)} {...rest} />;
}

export function H6({ className, ...rest }: GeneralHeadingProps) {
    return <Heading as="h6" className={twMerge("text-base", className)} {...rest} />;
}
