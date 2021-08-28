import { Tooltip as TippyTooltip } from "react-tippy";
import { TooltipProps } from "types";

export const Tooltip = ({
    title,
    position,
    distance,
    offset,
    size,
    children,
    style,
}: TooltipProps) => {
    return (
        <TippyTooltip
            // settings
            title={title}
            distance={distance}
            offset={offset}
            size={size}
            arrowSize={size}
            position={position}
            // set styling
            arrow={true}
            inertia={true}
            duration={200}
            multiple={false}
            style={{ display: "block", ...style }}
        >
            {children}
        </TippyTooltip>
    );
};
