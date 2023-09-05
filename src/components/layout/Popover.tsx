import { cloneElement, useCallback, useEffect, useMemo } from "react";

import type { Placement, Strategy } from "@floating-ui/react-dom-interactions";
import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingPortal,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useId,
    useInteractions,
} from "@floating-ui/react-dom-interactions";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface IPopoverBase {
    close: () => void;
}

interface IPopover {
    readonly active: boolean;

    /* Children is the element we're targeting */
    readonly children: JSX.Element;
    readonly className?: string;

    /* Render is the actual popover content */
    readonly render: (defaults: IPopoverBase) => React.ReactNode;

    readonly setPopover: (open: boolean) => void;

    readonly placement?: Placement;
    readonly clickToClose?: boolean;

    /* Optional parameter to automatically set width to targets width */
    readonly widthAtTarget?: boolean;

    /* Enable popover on target click */
    readonly toggleOnTargetClick?: boolean;

    /* Enable popover on hover */
    readonly toggleOnHover?: boolean;

    /* Allow focusing in popover */
    readonly toggleFocus?: boolean;

    /* Allows you to specify if you want absolute positioning or fixed positioning */
    readonly positionStrategy?: Strategy;

    readonly extraOffset?: number;
}

export function Popover({
    children,
    className,
    active,
    setPopover,
    render,

    /* Options */
    clickToClose = true,
    /* Always have tooltips on the bottom for mobiles unless if the dev wants it on the top */
    placement = "bottom",
    toggleFocus = false,
    toggleOnHover = false,
    toggleOnTargetClick = true,
    widthAtTarget = false,
    positionStrategy = "absolute",
    extraOffset = 0,
}: IPopover) {
    const { x, y, reference, floating, strategy, refs, update, context } = useFloating({
        open: active,
        onOpenChange: setPopover,
        middleware: [offset(10 + extraOffset), flip(), shift()],
        placement,
        strategy: positionStrategy,
    });

    const closePopover = useCallback(() => setPopover(false), [setPopover]);

    const WRAPPER_ANIMATION = useMemo(() => {
        let y = 0;
        let x = 0;

        if (placement.includes("top")) y = -10;
        if (placement.includes("bottom")) y = 10;

        if (placement.includes("left")) x = -10;
        if (placement.includes("right")) x = 10;

        return {
            initial: {
                opacity: 0.5,
                scale: 0.95,
                y,
                x,
            },
            animate: { opacity: 1, scale: 1, y: 0, x: 0 },
            exit: {
                opacity: 0,
                scale: 0.95,
                y,
                x,
            },
            transition: {
                duration: 0.15,
            },
        };
    }, [placement]);

    useEffect(() => {
        if (refs.reference.current && refs.floating.current && active) {
            return autoUpdate(refs.reference.current, refs.floating.current, update);
        }
    }, [active, update, refs.reference, refs.floating]);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context, {
            enabled: toggleOnTargetClick,
        }),
        useDismiss(context, {
            outsidePress: clickToClose,
        }),
        useFocus(context, {
            enabled: toggleFocus,
            keyboardOnly: true,
        }),
        useHover(context, {
            enabled: toggleOnHover,
        }),
    ]);

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const PopoverElement = (
        <AnimatePresence>
            {active ? (
                <FloatingFocusManager
                    context={context}
                    order={["reference", "content"]}
                    returnFocus={false}
                    initialFocus={-1}
                >
                    <motion.div
                        {...getFloatingProps({
                            "aria-labelledby": labelId,
                            "aria-describedby": descriptionId,
                        })}
                        ref={floating}
                        className={twMerge(
                            "absolute overflow-hidden rounded-md border border-solid border-white/10 bg-black/40 shadow-md backdrop-blur-md",
                            className
                        )}
                        transition={WRAPPER_ANIMATION.transition}
                        initial={WRAPPER_ANIMATION.initial}
                        exit={WRAPPER_ANIMATION.exit}
                        animate={WRAPPER_ANIMATION.animate}
                        style={{
                            position: strategy,
                            top: y ?? "",
                            left: x ?? "",
                            width: widthAtTarget
                                ? refs.reference.current?.getBoundingClientRect().width
                                : "auto",
                            zIndex: 999,
                        }}
                    >
                        {render({
                            close: closePopover,
                        })}
                    </motion.div>
                </FloatingFocusManager>
            ) : null}
        </AnimatePresence>
    );

    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
            {cloneElement(children, getReferenceProps({ ref: reference, ...children.props }))}

            <FloatingPortal id="popovers">{PopoverElement}</FloatingPortal>
        </>
    );
}
