import Link from "next/link";
import type { MutableRefObject } from "react";
import { useState, useCallback, useEffect, useRef } from "react";

import type { INavRouteName, IRoute } from "@/commons/config";
import { ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import { H2 } from "@/components/ui/Headings";

import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { useDraggable } from "react-use-draggable-scroll";

interface INavProps {
    selectedRoute: number;
}

export default function Nav({ selectedRoute }: INavProps) {
    const navRef = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
    const { events } = useDraggable(navRef);

    return (
        <nav
            ref={navRef}
            className="fixed flex overflow-y-hidden flex-row z-40 w-screen bg-background-secondary h-32 md:items-start md:flex-col md:w-52 md:h-screen"
            {...events}
        >
            <div className="flex items-center justify-center px-8  md:px-6 md:w-full md:h-52 ">
                <H2 className="text-6xl md:text-7xl">NL</H2>
            </div>
            <HorizontalDivider className="divide-x w-0 h-[80%] md:h-0 md:w-[80%] md:mx-auto" />
            <NavRouteList navRef={navRef} selectedRoute={selectedRoute} />
            <VerticalDivider className="ml-[25%] h-72 hidden md:block" />
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedResizeHandler = useCallback(debounce(resizeHandler, 100), []);

    useEffect(() => {
        window.addEventListener("resize", debouncedResizeHandler);
        return () => window.removeEventListener("resize", debouncedResizeHandler);
    }, [debouncedResizeHandler]);

    const isSelected = (name: INavRouteName) => name === ROUTES[selectedRoute]?.name;

    return (
        <motion.ul className="flex items-center w-fit h-full gap-8 px-12  md:gap-4 md:my-8 md:items-start md:flex-col md:w-full md:h-[unset] md:p-6 md:pr-0">
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
                className="absolute bg-green z-20 h-2 bottom-0 w-full rounded-t-[4px] md:right-0 md:top-[-10%] md:w-2 md:h-[120%] md:rounded-tr-none md:rounded-l-[4px]"
                style={{
                    originY: isNavVertical ? undefined : "0px",
                    originX: isNavVertical ? "0px" : undefined,
                }}
            />
        ) : null}
    </motion.li>
);
