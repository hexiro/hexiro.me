import type { MutableRefObject, PropsWithChildren } from "react";
import { memo } from "react";
import { useRef } from "react";

import type { IRoute } from "@/commons/config";
import { ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import { H2 } from "@/components/ui/Headings";
import { Link } from "@/components/ui/Links";

import useSelectedRouteIndex from "@/hooks/useSelectedRouteIndex";

import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";
import { twMerge } from "tailwind-merge";

const Nav = () => {
    const ref = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
    const {
        events: { onMouseDown },
    } = useDraggable(ref);

    return (
        <motion.nav
            ref={ref}
            layout
            layoutRoot
            className="fixed top-0 z-40 flex h-32 w-screen flex-row overflow-x-auto border-b-2 border-solid border-white/10 bg-background-secondary lg:h-screen lg:w-52 lg:flex-col lg:items-start lg:overflow-hidden lg:overflow-y-auto lg:border-0 lg:border-b-0 lg:border-r-2 lg:border-white/5"
            onMouseDown={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!ref.current) return;
                const { clientWidth, scrollWidth } = ref.current;
                const isScrollable = scrollWidth > clientWidth;
                if (!isScrollable) return;
                onMouseDown(e);
            }}
        >
            <div className="flex items-center justify-center px-8 lg:h-52 lg:min-h-[10em] lg:w-full lg:px-6">
                <button
                    type="button"
                    aria-label="Scroll to top"
                    className="group focus-visible:outline-none"
                    onClick={() =>
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                    }
                >
                    <H2 className="text-3xl drop-shadow-md transition-transform duration-fast ease-in-out group-hover:scale-110 group-focus-visible:scale-110 group-active:scale-95 sm:text-4xl lg:text-5xl">
                        NL
                    </H2>
                </button>
            </div>
            <HorizontalDivider className="my-auto h-[80%] w-0 divide-x lg:mx-auto lg:my-0 lg:h-0 lg:w-[80%]" />
            <NavRoutes />
            <div className="mb-8 hidden w-full flex-grow items-center tall:flex">
                <VerticalDivider className="ml-[25%] hidden h-3/4 lg:block" />
            </div>
        </motion.nav>
    );
};

export default memo(Nav);

function NavRoutes() {
    const selectedIndex = useSelectedRouteIndex();

    return (
        <ul className="flex h-full w-fit items-center gap-8 px-12 lg:my-6 lg:h-[unset] lg:w-full lg:flex-col lg:items-start lg:gap-[0.6em] lg:p-6 lg:pr-0">
            {ROUTES.map((route, index) => (
                <NavRoute key={route.name} route={route} isSelected={index === selectedIndex} />
            ))}
        </ul>
    );
}

interface INavRouteProps {
    route: IRoute;
    isSelected: boolean;
}

function NavRoute({ route, isSelected }: INavRouteProps) {
    const { name, path } = route;

    return (
        <li key={name} className="relative flex h-full w-full items-center text-lg drop-shadow-md">
            <div className="group/container lg:w-full">
                <Link
                    href={path}
                    className="group/link relative flex w-full gap-x-1 py-[0.2em] uppercase text-off-white focus-visible:outline-none"
                >
                    <span className="text-green">/</span>
                    <span className="relative overflow-hidden font-sans font-bold  transition-transform duration-fast ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[0.1em] after:w-full after:translate-x-[calc(-100%-1px)] after:bg-off-white after:transition-all after:duration-300 after:will-change-transform group-hover/container:translate-x-1 group-focus-visible/link:translate-x-2 group-focus-visible/link:after:translate-x-0 group-active/container:scale-95 lg:group-hover/container:translate-x-2">
                        {name}
                    </span>
                </Link>
            </div>
            <NavRouteSelectedIndicator isSelected={isSelected} />
        </li>
    );
}

interface INavRouteSelectedIndicatorProps {
    isSelected: boolean;
}

function NavRouteSelectedIndicator({ isSelected }: INavRouteSelectedIndicatorProps) {
    if (!isSelected) return null;

    return (
        <motion.div
            className="absolute bottom-0 z-20 h-2 w-full rounded-t-[3px] bg-green lg:right-0 lg:top-[-10%] lg:h-[120%] lg:w-2 lg:rounded-l-[3px] lg:rounded-tr-none"
            layoutId="selected-route-indicator"
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
