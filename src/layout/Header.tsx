import type { MutableRefObject } from "react";
import { memo } from "react";
import { useRef } from "react";

import type { IRoute } from "@/commons/config";
import { ROUTES } from "@/commons/config";

import { HorizontalDivider, VerticalDivider } from "@/components/layout/Divider";
import { H1 } from "@/components/ui/Headings";
import { Link } from "@/components/ui/Links";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useSelectedRouteIndex from "@/hooks/useSelectedRouteIndex";

import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";

const Header = () => {
    const ref = useRef<HTMLElement>() as MutableRefObject<HTMLElement>;
    const {
        events: { onMouseDown },
    } = useDraggable(ref);

    return (
        <motion.header
            ref={ref}
            layout
            layoutRoot
            className="fixed top-0 z-40 flex h-28 w-screen flex-row overflow-x-auto border-b-2 border-solid border-white/10 bg-background-secondary lg:h-screen lg:w-52 lg:flex-col lg:items-start lg:overflow-hidden lg:overflow-y-auto lg:border-0 lg:border-b-0 lg:border-r-2 lg:border-white/5"
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
                    aria-label="NL: scroll to top"
                    className="group focus-visible:outline-none"
                    onClick={() =>
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                    }
                >
                    <H1 className="text-3xl drop-shadow-md transition-transform duration-fast ease-in-out group-hover:scale-110 group-focus-visible:scale-110 group-active:scale-95 sm:text-4xl lg:text-5xl">
                        NL
                    </H1>
                </button>
            </div>
            <HorizontalDivider className="my-auto h-[80%] w-0 divide-x lg:mx-auto lg:my-0 lg:h-0 lg:w-[80%]" />
            <NavRoutes />
            <HeaderFog />
            <div className="mb-8 hidden w-full flex-grow items-center tall:flex">
                <VerticalDivider className="ml-[25%] hidden h-3/4 lg:block" />
            </div>
        </motion.header>
    );
};

export default memo(Header);

function NavRoutes() {
    const selectedIndex = useSelectedRouteIndex();

    return (
        <nav className="flex h-full w-fit items-center gap-8 px-12 lg:my-6 lg:h-[unset] lg:w-full lg:flex-col lg:items-start lg:gap-[0.6em] lg:p-6 lg:pr-0">
            {ROUTES.map((route, index) => (
                <NavRoute key={route.name} route={route} isSelected={index === selectedIndex} />
            ))}
        </nav>
    );
}

interface NavRouteProps {
    readonly route: IRoute;
    readonly isSelected: boolean;
}

function NavRoute({ route, isSelected }: NavRouteProps) {
    const { name, path } = route;

    return (
        <div
            key={name}
            className="relative flex h-full w-full items-center text-[1.35rem] drop-shadow-md"
        >
            <Link
                href={path}
                aria-label={`open ${name} page`}
                className="group relative flex gap-x-1 py-1 uppercase text-off-white focus-visible:outline-none lg:w-full"
            >
                <span className="text-green">/</span>
                <span className="relative overflow-hidden font-sans font-bold transition-transform duration-fast ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[0.1em] after:w-full after:translate-x-[calc(-100%-1px)] after:bg-off-white after:transition-all after:duration-300 after:will-change-transform group-hover:translate-x-1 group-focus-visible:translate-x-2 group-focus-visible:after:translate-x-0 group-active:scale-95 lg:group-hover:translate-x-2">
                    {name}
                </span>
            </Link>
            <NavRouteSelectedIndicator isSelected={isSelected} />
        </div>
    );
}
interface NavRouteSelectedIndicatorProps {
    readonly isSelected: boolean;
}

function NavRouteSelectedIndicator({ isSelected }: NavRouteSelectedIndicatorProps) {
    if (!isSelected) return null;

    return (
        <motion.div
            className="absolute bottom-0 z-20 h-2 w-full rounded-t-[3px] bg-green lg:right-0 lg:top-[-10%] lg:h-[120%] lg:w-2 lg:rounded-l-[3px] lg:rounded-tr-none"
            layoutId="selected-route-indicator"
        />
    );
}

function HeaderFog() {
    const ref = useRef<HTMLDivElement>(null);

    useIsomorphicLayoutEffect(() => {
        if (!ref.current) return;

        const el = ref.current;
        // parent is the header :)
        const header = el.parentElement as HTMLElement;

        const onScroll = () => {
            // compute opacity based on pixels left to scroll
            const scrollPixels = header.scrollWidth - header.clientWidth - header.scrollLeft;
            // divide by 2 bcuz approx. half is transparent.
            const width = Math.floor(el.clientWidth / 2);
            const scrollPercentage = Math.min(1, scrollPixels / width);

            el.style.opacity = String(scrollPercentage);
        };

        const onResize = () => {
            // >1024 is desktop
            // this may save resources on a slow device but idrk :shrug:
            if (window.innerWidth > 1024) return;

            const { clientWidth, scrollWidth } = header;
            const isScrollable = scrollWidth > clientWidth;
            el.dataset.isScrollable = String(isScrollable);

            if (isScrollable) onScroll();
        };

        onResize();

        window.addEventListener("resize", onResize);
        header.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("resize", onResize);
            header.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed right-0 top-0 h-28 w-1/3 bg-gradient-to-r from-transparent to-background-secondary data-[is-scrollable=false]:hidden lg:hidden"
        />
    );
}
