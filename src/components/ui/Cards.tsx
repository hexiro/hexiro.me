import type { PropsWithChildren } from "react";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ICardProps extends PropsWithChildren {
    isHoverable?: boolean;
    className?: string;
    as?: "div" | "li";
}

interface ICardMotionBaseProps {
    isHoverable?: boolean;
    className?: string;
    children: HTMLMotionProps<"div">["children"];
}
type ICardMotionAsProps =
    | {
          as?: never;
      }
    | ({
          as: "div";
      } & HTMLMotionProps<"div">)
    | ({
          as: "li";
      } & HTMLMotionProps<"li">);

type ICardMotionProps = ICardMotionBaseProps & ICardMotionAsProps;

const CARD_STYLES =
    "relative inline-block rounded-md border-2 border-white/10 bg-background-secondary px-8 py-6 shadow-md";
const CARD_HOVER_STYLES =
    "hover:perspective-800px transition-transform duration-[375ms] ease-in-out hover:rotate-[-1deg] hover:scale-105 active:scale-[.97]";

export function Card({ isHoverable, className, children, as: As = "div" }: ICardProps) {
    return (
        <As className={twMerge(CARD_STYLES, isHoverable && CARD_HOVER_STYLES, className)}>
            {children}
        </As>
    );
}

export function MotionCard({
    isHoverable,
    className,
    children,
    as = "div",
    ...props
}: ICardMotionProps) {
    let As: typeof motion.div | typeof motion.li;

    if (as === "div") As = motion.div;
    else As = motion.li;

    return (
        // @ts-expect-error props don't match between motion.li & motion.div but this shouldn't be a problem
        // i'll fix this later if I have time
        <As
            {...props}
            className={twMerge(CARD_STYLES, isHoverable && CARD_HOVER_STYLES, className)}
        >
            {children}
        </As>
    );
}

export function SecondaryCard({ className, children, as: As = "div" }: ICardProps) {
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
