import type { RefObject } from "react";

import { useInView } from "framer-motion";

export default function useFirstTimeInView(ref: RefObject<HTMLElement>) {
    return useInView(ref, { once: true });
}
