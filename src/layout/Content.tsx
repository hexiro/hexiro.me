import Link from "next/link";
import type { Router } from "next/router";
import type { PropsWithChildren } from "react";
import { useCallback, useState, useEffect } from "react";

import { NAV_PATHS } from "@/commons/config";

import type { IconType } from "@/components/ui/Icons";
import { ArrowUpIcon, ArrowDownIcon } from "@/components/ui/Icons";

import Nav from "@/layout/Nav";

import { twMerge } from "tailwind-merge";

interface IContentProps extends PropsWithChildren {
    router: Router;
}

export default function Content({ router, children }: IContentProps) {
    const findSelectedRoute = useCallback(
        () => NAV_PATHS.findIndex((path) => path === router.pathname),
        [router.pathname]
    );

    const [selectedRoute, setSelectedRoute] = useState<number>(findSelectedRoute());

    useEffect(() => {
        setSelectedRoute(findSelectedRoute());
    }, [findSelectedRoute, router.pathname]);

    const prevRoute = NAV_PATHS[selectedRoute - 1];
    const nextRoute = NAV_PATHS[selectedRoute + 1];

    return (
        <>
            <Nav selectedRoute={selectedRoute} />
            <main className="mb-32 flex min-h-screen w-full flex-col rounded-t-md bg-background px-[5%] py-28 lg:mb-0 lg:ml-52 lg:mt-0 lg:rounded-l-md lg:px-[10%]">
                <div>
                    <PageEndNavigation href={prevRoute} icon={ArrowUpIcon} className="mb-8 mt-2">
                        Prev
                    </PageEndNavigation>
                    <div className="flex-grow">{children}</div>
                    <PageEndNavigation href={nextRoute} icon={ArrowDownIcon} className="mb-2 mt-8">
                        Next
                    </PageEndNavigation>
                </div>
            </main>
        </>
    );
}

interface IPageEndNavigationProps extends PropsWithChildren {
    href: string | undefined;
    icon: IconType;
    className?: string;
}

const PageEndNavigation = ({ href, icon: Icon, className, children }: IPageEndNavigationProps) => {
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
};
