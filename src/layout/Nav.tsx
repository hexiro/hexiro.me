import Link from "next/link";
import type { MutableRefObject } from "react";
import { useState, useRef } from "react";

import type { INavRouteName, IRoute } from "@/commons/config";
import { ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import { H2 } from "@/components/ui/Headings";

import useDebouncedResizeEffect from "@/hooks/useDebouncedResizeEffect";

import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";

interface INavProps {
    selectedRoute: number;
}

export default function Nav({ selectedRoute }: INavProps) {
    const navRef = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
    const { events } = useDraggable(navRef);

    const [isNavOverflown, setIsNavOverflown] = useState<boolean>(false);

    const handler = () => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!navRef.current) return;
        const { clientWidth, scrollWidth } = navRef.current;

        setIsNavOverflown(scrollWidth > clientWidth);
    };

    useDebouncedResizeEffect(handler, 100, [navRef.current]);

    return (
        <motion.nav
            ref={navRef}
            layout
            layoutRoot
            data-lenis-prevent=""
            className="fixed top-0 z-40 flex h-32 w-screen flex-row overflow-y-hidden border-b-2 border-solid border-white/10 bg-background-secondary lg:h-screen lg:w-52 lg:flex-col lg:items-start lg:border-0"
            {...(isNavOverflown ? events : {})}
        >
            <div className="flex items-center justify-center px-8 lg:h-52 lg:w-full lg:px-6">
                <H2 className="text-3xl sm:text-4xl lg:text-5xl">NL</H2>
            </div>
            <HorizontalDivider className="my-auto h-[80%] w-0 divide-x lg:mx-auto lg:my-0 lg:h-0 lg:w-[80%]" />
            <NavRouteList navRef={navRef} selectedRoute={selectedRoute} />
            <VerticalDivider className="ml-[25%] hidden h-72 lg:block" />
        </motion.nav>
    );
}

interface INavRouteProps extends IRoute {
    isSelected: boolean;
    isNavVertical: boolean;
}

interface INavRouteListProps {
    navRef: MutableRefObject<HTMLElement>;
    selectedRoute: number;
}

const NavRouteList = ({ navRef, selectedRoute }: INavRouteListProps) => {
    const [isNavVertical, setIsNavVertical] = useState<boolean>(false);

    const resizeHandler = () => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!navRef.current) return;
        const { width, height } = navRef.current.getBoundingClientRect();

        setIsNavVertical(height > width);
    };

    useDebouncedResizeEffect(resizeHandler, 100, [navRef.current]);

    const isSelected = (name: INavRouteName) => name === ROUTES[selectedRoute]?.name;

    return (
        <motion.ul className="flex h-full w-fit items-center gap-8 px-12  lg:my-8 lg:h-[unset] lg:w-full lg:flex-col lg:items-start lg:gap-4 lg:p-6 lg:pr-0">
            {ROUTES.map(({ name, path }) => (
                <NavRoute
                    key={name}
                    name={name}
                    path={path}
                    isSelected={isSelected(name)}
                    isNavVertical={isNavVertical}
                />
            ))}
        </motion.ul>
    );
};

const NavRoute = ({ name, path, isSelected, isNavVertical }: INavRouteProps) => (
    <motion.li key={name} className="relative flex h-full w-full items-center text-lg">
        <WithNavLink name={name} path={path} isSelected={isSelected} />
        {isSelected ? (
            <motion.div
                layoutId="selected-route-indicator"
                className="absolute bottom-0 z-20 h-2 w-full rounded-t-[4px] bg-green lg:right-0 lg:top-[-10%] lg:h-[120%] lg:w-2 lg:rounded-l-[4px] lg:rounded-tr-none"
                style={{
                    originY: isNavVertical ? undefined : "0px",
                    originX: isNavVertical ? "0px" : undefined,
                }}
            />
        ) : null}
    </motion.li>
);

const WithNavLink = ({ name, path, isSelected }: Omit<INavRouteProps, "isNavVertical">) => {
    const inner = (
        <>
            <span className="mr-1 text-green">/</span>
            {name}
        </>
    );

    const className = "text-off-white uppercase";

    if (isSelected) {
        return <span className={className}>{inner}</span>;
    }

    return (
        <Link href={path} className={className}>
            {inner}
        </Link>
    );
};
