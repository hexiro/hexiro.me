import { useEffect, useState } from "react";

interface UsePassedScrollPositionProps {
    pixels: number;
    defaultValue?: boolean;
}

export default function usePassedScrollPosition({
    pixels,
    defaultValue,
}: UsePassedScrollPositionProps): boolean {
    const [state, setState] = useState(defaultValue ?? false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > pixels) {
                setState(true);
            } else {
                setState(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pixels]);

    return state;
}
