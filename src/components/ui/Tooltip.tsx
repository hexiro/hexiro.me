import type { TooltipProps as TippyTooltipProps } from "react-tippy";
import { Tooltip as TippyTooltip } from "react-tippy";

interface TooltipProps extends Omit<TippyTooltipProps, "theme" | "size"> {
    block?: boolean;
    size?: "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<TooltipProps["size"]>, NonNullable<TippyTooltipProps["size"]>> = {
    sm: "small",
    md: "regular",
    lg: "big",
};

export default function Tooltip({
    title,
    block = true,
    size = "md",
    animateFill,
    style,
    children,
    ...props
}: TooltipProps) {
    return (
        <WithTippyTooltip
            title={title}
            size={sizeMap[size]}
            animateFill={animateFill ?? false}
            style={{ display: block ? "block" : "inline", ...style }}
            {...props}
        >
            {children}
        </WithTippyTooltip>
    );
}

// if title is not provided,
// tippy will not render when it is provided on rerenders,
// need to control when to render
const WithTippyTooltip = ({ children, ...props }: TippyTooltipProps) => {
    if (!props.title) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    return <TippyTooltip {...props}>{children}</TippyTooltip>;
};
