import React, { useEffect, useState } from "react";

// based off
// https://github.com/gkaemmer/react-fade-in

interface FadeInProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    delay?: number;
    transitionDuration?: number;
}

export const FadeIn = ({
    delay,
    transitionDuration,
    children,
    className,
    style,
    ...all
}: FadeInProps): JSX.Element | null => {
    if (!children) return null;
    const [maxIsVisible, setMaxIsVisible] = useState<number>(0);
    if (!transitionDuration) transitionDuration = 400;
    if (!delay) delay = 50;

    const parent = children as React.ReactPortal;
    children = parent.props.children;

    const count = React.Children.count(children);

    useEffect(() => {
        if (count == maxIsVisible) return;

        // Move maxIsVisible toward count
        const increment = count > maxIsVisible ? 1 : -1;
        const timeout = setTimeout(() => {
            setMaxIsVisible(maxIsVisible + increment);
        }, delay);
        return () => clearTimeout(timeout);
    }, [count, delay, maxIsVisible]);

    return React.cloneElement(parent, {
        children: React.Children.map(children, (child, i) => {
            return (
                <div
                    className={className ? `fade-in ${className}` : "fade-in"}
                    style={{
                        transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                        transform: maxIsVisible > i ? "none" : "translateY(20px)",
                        opacity: maxIsVisible > i ? 1 : 0,
                        ...style,
                    }}
                    {...all}
                >
                    {child}
                </div>
            );
        }),
    });
};
