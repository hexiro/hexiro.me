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
        "relative inline-block rounded-md border-2 border-white/10 bg-background-secondary px-8 py-6 shadow-lg",
        isHoverable &&
            "transition-transform duration-[375ms] ease-in-out hover:rotate-[-1deg] hover:scale-[1.03] active:scale-[.97]",
        className
    );

    if (as === "li") {
        props = props as React.HTMLProps<HTMLLIElement>;
        return (
            <li {...props} className={className}>
                {children}
            </li>
        );
    }

    props = props as React.HTMLProps<HTMLDivElement>;
    return (
        <div {...props} className={className}>
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
