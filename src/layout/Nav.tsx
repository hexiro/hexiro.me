import type { MutableRefObject, PropsWithChildren } from "react";
import { memo } from "react";
import { useRef, useCallback } from "react";

import type { IRoute } from "@/commons/config";
import { ROUTES } from "@/commons/config";
import type { NavDirection } from "@/commons/state";
import { useNavStateStore, useSelectedRouteStore } from "@/commons/state";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import { H2 } from "@/components/ui/Headings";
import { Link } from "@/components/ui/Links";

import useDebouncedResizeEffect from "@/hooks/useDebouncedResizeEffect";

import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";
import { twMerge } from "tailwind-merge";

const Nav = () => {
    const ref = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
    const { events } = useDraggable(ref);

    const setNavState = useNavStateStore((state) => state.set);
    const isScrollable = useNavStateStore((state) => state.scrollable);

    const resizeHandler = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!ref.current) return;

        const { clientWidth, scrollWidth } = ref.current;
        const { width, height } = ref.current.getBoundingClientRect();

        const isScrollable = scrollWidth > clientWidth;
        const direction: NavDirection = height > width ? "vertical" : "horizontal";

        setNavState(direction, isScrollable);
    }, [setNavState]);

    useDebouncedResizeEffect(resizeHandler, 100, [ref.current]);

    return (
        <motion.nav
            ref={ref}
            layout
            layoutRoot
            data-lenis-prevent=""
            className="fixed top-0 z-40 flex h-32  w-screen flex-row overflow-x-auto border-b-2 border-solid border-white/10 bg-background-secondary lg:h-screen lg:w-52 lg:flex-col lg:items-start lg:overflow-hidden lg:overflow-y-auto lg:border-0"
            {...(isScrollable ? events : {})}
        >
            <div className="flex items-center justify-center px-8 lg:h-52 lg:min-h-[10em] lg:w-full lg:px-6">
                <H2 className="text-3xl sm:text-4xl lg:text-5xl">NL</H2>
            </div>
            <HorizontalDivider className="my-auto h-[80%] w-0 divide-x lg:mx-auto lg:my-0 lg:h-0 lg:w-[80%]" />
            <ul className="flex h-full w-fit items-center gap-8 px-12  lg:my-8 lg:h-[unset] lg:w-full lg:flex-col lg:items-start lg:gap-4 lg:p-6 lg:pr-0">
                {ROUTES.map((route) => (
                    <NavRoute key={route.name} route={route} />
                ))}
            </ul>
            <div className="mb-8 hidden w-full flex-grow items-center tall:flex">
                <VerticalDivider className="ml-[25%] h-3/4 hidden lg:block" />
            </div>
        </motion.nav>
    );
};

export default memo(Nav);

interface INavRouteProps {
    route: IRoute;
}

function NavRoute({ route }: INavRouteProps) {
    const { name, path } = route;

    const selectedRoutePath = useSelectedRouteStore((state) => state.path);
    const isSelected = selectedRoutePath === path;

    return (
        <li key={name} className="group relative flex h-full w-full items-center text-lg">
            <WithNavLink
                href={path}
                className="inline-flex w-full gap-x-1 uppercase text-off-white"
                isSelected={isSelected}
            >
                <span className="text-green">/</span>
                <motion.span className="block transition-transform duration-fast ease-in-out group-hover:translate-x-2 group-active:scale-95">
                    {name}
                </motion.span>
            </WithNavLink>
            <NavRouteSelectedIndicator isSelected={isSelected} />
        </li>
    );
}

interface INavRouteSelectedIndicatorProps {
    isSelected: boolean;
}

function NavRouteSelectedIndicator({ isSelected }: INavRouteSelectedIndicatorProps) {
    const navDirection = useNavStateStore((state) => state.direction);
    if (!isSelected) return null;

    const style = {
        originY: navDirection === "vertical" ? undefined : "0px",
        originX: navDirection === "vertical" ? "0px" : undefined,
    };

    return (
        <motion.div
            layoutId="selected-route-indicator"
            className="absolute bottom-0 z-20 h-2 w-full rounded-t-[4px] bg-green lg:right-0 lg:top-[-10%] lg:h-[120%] lg:w-2 lg:rounded-l-[4px] lg:rounded-tr-none"
            style={style}
        />
    );
}

interface INavLinkProps extends PropsWithChildren {
    href: string;
    className?: string;
    isSelected: boolean;
}
function WithNavLink({ href, isSelected, className, children }: INavLinkProps) {
    if (isSelected) {
        // a little bit of a fib with the cursor-pointer, may revisit in future
        return <span className={twMerge(className, "cursor-pointer")}>{children}</span>;
    }

    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}
