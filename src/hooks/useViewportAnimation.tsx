import type { Ref, RefObject } from "react";
import { useEffect } from "react";

import { useAnimationControls, useInView } from "framer-motion";

export default function useViewportAnimation(ref: Ref<HTMLElement>) {
    const controls = useAnimationControls();

    let inView: boolean;
    if (ref) {
        inView = useInView(ref as RefObject<HTMLElement>, { once: true, amount: 0.35 });
    } else {
        inView = true;
    }

    useEffect(() => {
        if (!inView) return;

        void controls.start("animate");
    }, [controls, inView]);

    return controls;
}
