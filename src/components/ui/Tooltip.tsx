import type { TooltipProps as TippyTooltipProps } from "react-tippy";
import { Tooltip as TippyTooltip } from "react-tippy";

interface TooltipProps extends Omit<TippyTooltipProps, "theme"> {
    block?: boolean;
}

export default function Tooltip({
    title,
    block = true,
    animateFill,
    style,
    children,
    ...props
}: TooltipProps) {
    return (
        <WithTippyTooltip
            title={title}
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
const WithTippyTooltip = ({ children, ...props }: TooltipProps) => {
    if (!props.title) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{children}</>;
    }

    return <TippyTooltip {...props}>{children}</TippyTooltip>;
};
