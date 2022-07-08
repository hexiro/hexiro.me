import { useEffect, useState } from "react";

export default function useHasScrolled(): boolean {
    const [state, setState] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setState(true);
            } else {
                setState(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return state;
}
