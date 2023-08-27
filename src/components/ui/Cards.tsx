import type { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

type CardProps = PropsWithChildren<{
    isHoverable?: boolean;
    className?: string;
}> &
    CardIsomorphicProps;

type CardIsomorphicProps =
    | {
          as?: never;
      }
    | ({
          as: "li";
      } & React.HTMLProps<HTMLLIElement>)
    | ({
          as: "div";
      } & React.HTMLProps<HTMLDivElement>);

export function Card({ isHoverable, className, children, as = "div", ...props }: CardProps) {
    className = twMerge(
        "relative group inline-block rounded-md border-2 border-white/10 bg-background-secondary px-8 py-6 shadow-lg",
        isHoverable &&
            "transition-transform duration-[225ms] ease-in-out hover:-translate-y-[5px] hover:scale-[1.02] active:scale-[.98]",
        className
    );

    if (as === "li") {
        props = props as React.HTMLProps<HTMLLIElement>;
        return (
            <li role="group" {...props} className={className}>
                {children}
            </li>
        );
    }

    props = props as React.HTMLProps<HTMLDivElement>;
    return (
        <div role="group" {...props} className={className}>
            {children}
        </div>
    );
}

export function SecondaryCard({ className, children, as: As = "div" }: CardProps) {
    return (
        <As
            className={twMerge(
                "relative inline-block rounded-[4px] border-2 border-white/10 bg-white/5 p-5 shadow-sm",
                className
            )}
        >
            {children}
        </As>
    );
}
