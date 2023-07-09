import type { DependencyList } from "react";
import { useCallback, useEffect } from "react";

import debounce from "lodash.debounce";

export default function useDebouncedResizeEffect(
    handler: (...args: any[]) => void,
    wait: number,
    deps: DependencyList
) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedResizeHandler = useCallback(debounce(handler, wait), deps);

    useEffect(() => {
        handler();
        window.addEventListener("resize", debouncedResizeHandler);
        return () => window.removeEventListener("resize", debouncedResizeHandler);
    }, [debouncedResizeHandler, handler]);
}
