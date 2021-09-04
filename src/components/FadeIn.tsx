import React, { useEffect, useState } from "react";

// based off
// https://github.com/gkaemmer/react-fade-in

export const FadeIn = ({
    delay,
    transitionDuration,
    className,
    children,
}: {
    delay?: number;
    transitionDuration?: number;
    className?: string;
    children?: React.ReactNode;
}) => {
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

    return (
        <div className={parent.props.className}>
            {React.Children.map(children, (child, i) => {
                if (child)
                    return (
                        <div
                            className={String(i)}
                            style={{
                                transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                                transform: maxIsVisible > i ? "none" : "translateY(20px)",
                                opacity: maxIsVisible > i ? 1 : 0,
                            }}
                        >
                            {child}
                        </div>
                    );
            })}
        </div>
    );
};
