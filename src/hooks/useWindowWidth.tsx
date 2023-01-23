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
    handler?: () => void;
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

            console.log({ width, min, max }, isWidthWithinBounds);

            if (min && width <= min) return setIsWidthWithinBounds(false);
            if (max && width >= max) return setIsWidthWithinBounds(false);

            if (isWidthWithinBounds) return;

            if (handler) handler();
            setIsWidthWithinBounds(true);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, handler]);

    return isWidthWithinBounds;
}
