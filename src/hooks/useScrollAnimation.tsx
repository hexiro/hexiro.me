import { useEffect, useState } from "react";

import type { AnimationControls } from "framer-motion";
import { useAnimation } from "framer-motion";

export const useScrollAnimation = (inView: boolean): AnimationControls => {
    const animate = useAnimation();
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        if (completed) return;
        if (inView) {
            void animate.start("complete");
            setCompleted(true);
        }
        // if completed was in dependency array, it would rerender forever
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animate, inView]);

    return animate;
};
