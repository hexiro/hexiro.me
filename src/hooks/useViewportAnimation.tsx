import type { RefObject } from "react";
import { useEffect } from "react";

import { useAnimationControls, useInView } from "framer-motion";

export default function useViewportAnimation(ref: RefObject<HTMLElement>) {
    const inView = useInView(ref, { once: true, amount: 0.35 });
    const controls = useAnimationControls();

    useEffect(() => {
        if (!inView) return;

        void controls.start("animate");
    }, [controls, inView]);

    return controls;
}
