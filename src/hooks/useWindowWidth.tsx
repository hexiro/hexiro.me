import { useEffect, useState } from "react";

type UseWindowWidthMinMaxOptions =
    | {
          min: number;
          max?: never;
      }
    | {
          min?: never;
          max: number;
      }
    | {
          min: number;
          max: number;
      };

type UseWindowWidthOptions = UseWindowWidthMinMaxOptions & {
    handler?: (state: boolean) => void;
};

export default function useWindowWidthInBounds({
    min,
    max,
    handler,
}: UseWindowWidthOptions): boolean {
    const [isWidthWithinBounds, setIsWidthWithinBounds] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            let newState: boolean;

            if (min && width <= min) newState = false;
            else if (max && width >= max) newState = false;
            else newState = true;

            if (newState === isWidthWithinBounds) return;

            if (handler) handler(newState);
            setIsWidthWithinBounds(newState);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, handler]);

    return isWidthWithinBounds;
}
