import type { PropsWithChildren } from "react";

import type { TooltipProps as TippyTooltipProps } from "react-tippy";
import { Tooltip as TippyTooltip } from "react-tippy";

export const Tooltip = ({ children, style, ...all }: TooltipProps): JSX.Element => (
    <TippyTooltip
        {...all}
        // Set styling
        arrow
        inertia
        duration={200}
        multiple={false}
        style={{ display: "block", ...style }}
    >
        {children}
    </TippyTooltip>
);

type TooltipProps = PropsWithChildren<
    Omit<TippyTooltipProps, "arrow" | "inertia" | "duration" | "multiple">
>;
