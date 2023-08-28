import type { PropsWithChildren } from "react";

import { NAV_PATHS } from "@/commons/config";

import type { IconType } from "@/components/ui/Icons";
import { ArrowUpIcon, ArrowDownIcon } from "@/components/ui/Icons";
import { Link } from "@/components/ui/Links";

import useSelectedRouteIndex from "@/hooks/useSelectedRouteIndex";

import { twMerge } from "tailwind-merge";

export function PagePrevNavigation() {
    const selectedIndex = useSelectedRouteIndex();
    const prevRoute = NAV_PATHS[selectedIndex - 1];

    return (
        <PageEndNavigation
            href={prevRoute}
            icon={ArrowUpIcon}
            className="mb-8 mt-2"
            iconClassName="group-hover:-translate-y-[5px] group-focus-visible:-translate-y-[5px]"
        >
            Prev
        </PageEndNavigation>
    );
}

export function PageNextNavigation() {
    const selectedIndex = useSelectedRouteIndex();
    const nextRoute = NAV_PATHS[selectedIndex + 1];

    return (
        <PageEndNavigation
            href={nextRoute}
            icon={ArrowDownIcon}
            className="mb-2 mt-8"
            iconClassName="group-hover:translate-y-[5px] group-focus-visible:translate-y-[5px]"
        >
            Next
        </PageEndNavigation>
    );
}

interface IPageEndNavigationProps extends PropsWithChildren {
    href: string | undefined;
    icon: IconType;
    className?: string;
    iconClassName?: string;
}

function PageEndNavigation({
    href,
    icon: Icon,
    className,
    iconClassName,
    children,
}: IPageEndNavigationProps) {
    const AnchorElement = href ? Link : "a";
    const disabled = !href;

    return (
        <AnchorElement
            // @ts-expect-error ts doesn't recognize that href can't be undefined when using Link
            href={href}
            className={twMerge(
                "justify-left group flex items-center text-base text-text focus-visible:outline-none aria-disabled:cursor-not-allowed aria-disabled:line-through aria-disabled:opacity-50",
                className
            )}
            aria-disabled={disabled}
        >
            <Icon
                className={twMerge(
                    "text-text transition-transform duration-[225ms] group-aria-disabled:translate-y-0",
                    iconClassName
                )}
            />
            <span className="ml-1 underline-offset-8 group-focus-visible:underline">
                {children}
            </span>
        </AnchorElement>
    );
}
