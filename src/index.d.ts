import type { ReactNode } from "react";

declare module "react-tippy" {
    export interface TooltipProps {
        children: ReactNode;
    }
}
