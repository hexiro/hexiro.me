/* eslint-disable @typescript-eslint/no-empty-function */
import type { UIEvent } from "react";
import { createContext } from "react";

interface CursorContextType {
    wrap: (element: HTMLElement) => void;
    unwrap: () => void;
    scroll: (e: UIEvent<HTMLElement>) => void;
    scale: Scale | null;
    position: Position | null;
}

export interface Position {
    x: number;
    y: number;
}

export type Scale = Position;

export const CursorContext = createContext<CursorContextType>({
    wrap() {},
    unwrap() {},
    scroll() {},
    scale: null,
    position: null,
});
