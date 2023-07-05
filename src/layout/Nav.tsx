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
        <nav
            ref={navRef}
            data-lenis-prevent=""
            className="fixed flex overflow-y-hidden flex-row bottom-0 z-40 w-screen border-t-2 border-solid border-white/10 bg-background-secondary h-32 lg:border-0 lg:items-start lg:flex-col lg:w-52 lg:h-screen"
            {...(isNavOverflown ? events : {})}
        >
            <div className="flex items-center justify-center px-8 lg:px-6 lg:w-full lg:h-52">
                <H2 className="text-3xl sm:text-4xl lg:text-5xl">NL</H2>
            </div>
            <HorizontalDivider className="divide-x w-0 h-[80%] my-auto lg:my-0 lg:h-0 lg:w-[80%] lg:mx-auto" />
            <NavRouteList navRef={navRef} selectedRoute={selectedRoute} />
            <VerticalDivider className="ml-[25%] h-72 hidden lg:block" />
        </nav>
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
        <motion.ul className="flex items-center w-fit h-full gap-8 px-12  lg:gap-4 lg:my-8 lg:items-start lg:flex-col lg:w-full lg:h-[unset] lg:p-6 lg:pr-0">
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
    <motion.li key={name} className="relative flex items-center w-full h-full text-lg">
        <Link href={path} className="text-off-white">
            <span className="mr-1 text-green">/</span>
            {name}
        </Link>
        {isSelected ? (
            <motion.div
                layoutId="selected-route-indicator"
                className="absolute bg-green z-20 h-2 bottom-0 w-full rounded-t-[4px] lg:right-0 lg:top-[-10%] lg:w-2 lg:h-[120%] lg:rounded-tr-none lg:rounded-l-[4px]"
                style={{
                    originY: isNavVertical ? undefined : "0px",
                    originX: isNavVertical ? "0px" : undefined,
                }}
            />
        ) : null}
    </motion.li>
);
