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
            <main className="bg-background py-28 px-[5%] lg:px-[10%] flex flex-col w-full rounded-t-md mt-32 lg:mt-0 lg:ml-52 lg:rounded-l-md min-h-screen">
                <div>
                    <PageEndNavigation href={prevRoute} icon={ArrowUpIcon} className="mt-2 mb-8">
                        Prev
                    </PageEndNavigation>
                    <div className="flex-grow">{children}</div>
                    <PageEndNavigation href={nextRoute} icon={ArrowDownIcon} className="mt-8 mb-2">
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
                "flex justify-left items-center text-text text-base aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
                className
            )}
            aria-disabled={disabled}
        >
            <Icon className="text-text" />
            <span className="ml-1">{children}</span>
        </AnchorElement>
    );
};
