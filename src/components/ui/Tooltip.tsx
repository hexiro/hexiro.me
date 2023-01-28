import type { TooltipProps as TippyTooltipProps } from "react-tippy";
import { Tooltip as TippyTooltip } from "react-tippy";

interface TooltipProps extends Omit<TippyTooltipProps, "theme"> {
    block?: boolean;
}

export default function Tooltip({
    block = true,
    animateFill,
    style,
    children,
    ...props
}: TooltipProps) {
    return (
        <TippyTooltip
            animateFill={animateFill ?? false}
            style={{ display: block ? "block" : "inline", ...style }}
            {...props}
        >
            {children}
        </TippyTooltip>
    );
}
