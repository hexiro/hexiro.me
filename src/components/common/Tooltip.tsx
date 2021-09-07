import { Position, Size, Tooltip as TippyTooltip } from "react-tippy";

export const Tooltip = ({
    title,
    position,
    distance,
    offset,
    size,
    children,
    style,
}: TooltipProps): JSX.Element => {
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

interface TooltipProps {
    title?: string;
    position?: Position;
    distance?: number;
    offset?: number;
    size?: Size;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}
