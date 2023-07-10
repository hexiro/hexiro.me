import type { PropsWithChildren } from "react";

import { useSelectedRouteStore } from "@/commons/state";

import type { IconType } from "@/components/ui/Icons";
import { ArrowUpIcon, ArrowDownIcon } from "@/components/ui/Icons";
import { Link } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

export function PagePrevNavigation() {
    const prevRoute = useSelectedRouteStore((state) => state.prevRoute);

    return (
        <PageEndNavigation href={prevRoute} icon={ArrowUpIcon} className="mb-8 mt-2">
            Prev
        </PageEndNavigation>
    );
}

export function PageNextNavigation() {
    const nextRoute = useSelectedRouteStore((state) => state.nextRoute);

    return (
        <PageEndNavigation href={nextRoute} icon={ArrowDownIcon} className="mb-2 mt-8">
            Next
        </PageEndNavigation>
    );
}

interface IPageEndNavigationProps extends PropsWithChildren {
    href: string | undefined;
    icon: IconType;
    className?: string;
}

function PageEndNavigation({ href, icon: Icon, className, children }: IPageEndNavigationProps) {
    const AnchorElement = href ? Link : "a";
    const disabled = !href;

    return (
        <AnchorElement
            // @ts-expect-error ts doesn't recognize that href can't be undefined when using Link
            href={href}
            className={twMerge(
                "justify-left flex items-center text-base text-text aria-disabled:cursor-not-allowed aria-disabled:line-through aria-disabled:opacity-50",
                className
            )}
            aria-disabled={disabled}
        >
            <Icon className="text-text" />
            <span className="ml-1">{children}</span>
        </AnchorElement>
    );
}
