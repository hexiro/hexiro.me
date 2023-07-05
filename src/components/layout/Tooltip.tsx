import type { ReactElement } from "react";
import { useState } from "react";

import { Popover } from "@/components/layout/Popover";

import type { Placement } from "@floating-ui/react-dom-interactions";
import { twMerge } from "tailwind-merge";

type AlignText = "center" | "end" | "start" | "left" | "right";

interface ITooltipProps {
    title: string | ReactElement;
    children: JSX.Element;
    className?: string;
    placement?: Placement;
    alignText?: AlignText;
    enabled?: boolean;
}

export function Tooltip({
    placement,
    children,
    title,
    className,
    alignText = "center",
    enabled = true,
}: ITooltipProps) {
    const [active, setActive] = useState(false);

    return (
        <Popover
            toggleOnHover
            active={enabled ? active : false}
            setPopover={setActive}
            render={() => (
                <div
                    className={twMerge(
                        "max-w-xs select-none border border-solid border-white/10 px-2 py-1 font-sans text-sm font-bold text-text",
                        alignText === "center" && "text-center",
                        alignText === "end" && "text-end",
                        alignText === "start" && "text-start",
                        alignText === "left" && "text-left",
                        alignText === "right" && "text-right",
                        className
                    )}
                >
                    {title}
                </div>
            )}
            clickToClose={false}
            placement={placement}
            toggleOnTargetClick={false}
            widthAtTarget={false}
            toggleFocus={false}
        >
            {children}
        </Popover>
    );
}

export default Tooltip;
