import { useEffect, useState } from "react";

import type { AnimationControls } from "framer-motion";
import { useAnimation } from "framer-motion";

export const useScrollAnimation = (inView: boolean): AnimationControls => {
    const animate = useAnimation();
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        if (completed) return;
        if (inView) {
            animate.start("complete");
            setCompleted(true);
        }
    }, [animate, inView]);

    return animate;
};
