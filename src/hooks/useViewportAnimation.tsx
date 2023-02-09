import type { Ref, RefObject } from "react";
import { useEffect } from "react";

import { useAnimationControls, useInView } from "framer-motion";

export default function useViewportAnimation(ref: Ref<HTMLElement>) {
    const controls = useAnimationControls();

    const inView = useInView(ref as RefObject<HTMLElement>, { once: true, amount: 0.35 });

    useEffect(() => {
        if (!inView) return;

        void controls.start("animate");
    }, [controls, inView]);

    return controls;
}
