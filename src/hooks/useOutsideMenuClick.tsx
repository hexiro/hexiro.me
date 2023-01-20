import type { RefObject } from "react";
import { useEffect } from "react";

// thank you to cody miller for giving me the guts of this hook :)
// warning: possible edge-case using click event listener

interface UseOutsideMenuClickOptions<
    T extends HTMLElement = HTMLElement,
    Z extends HTMLElement = HTMLElement
> {
    menuRef: RefObject<T>;
    buttonRef: RefObject<Z>;
    handler: (event: Event) => void;
}

export default function useOutsideMenuClick({
    menuRef,
    buttonRef,
    handler,
}: UseOutsideMenuClickOptions) {
    useEffect(() => {
        const listener = (event: Event) => {
            const path = event.composedPath() as HTMLElement[];

            for (const el of path) {
                if (el === menuRef.current || el === buttonRef.current) {
                    return;
                }
            }

            handler(event);
        };

        window.addEventListener("click", listener);

        return () => {
            window.removeEventListener("click", listener);
        };
    }, [handler, menuRef, buttonRef]);
}
