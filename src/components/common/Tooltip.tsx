import { PropsWithChildren } from "react";

import { Tooltip as TippyTooltip, TooltipProps as TippyTooltipProps } from "react-tippy";

export const Tooltip = ({ children, style, ...all }: TooltipProps): JSX.Element => (
    <TippyTooltip
        {...all}
        // set styling
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
