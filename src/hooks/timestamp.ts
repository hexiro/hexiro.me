import { useEffect, useState } from "react";

import {Timestamps} from "react-use-lanyard"

const formatTime = (secs: number): string => {
    const rel = Math.floor((Date.now() - secs) / 1000);
    let hours = Math.floor(rel / 3600);
    let minutes = Math.floor(rel / 60) % 60;
    let seconds = rel % 60;
    const formatted = [hours, minutes, seconds]
        .map((v) => ("" + v).padStart(2, "0"))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    return formatted ? formatted + " elapsed" : "";
};

export default function Timestamper(stamps: Timestamps | undefined): string | null {
    const [elapsed, setElapsed] = useState("");
    
    useEffect(() => {
        function updateTimestamp() {
            if (!stamps) return
            const start = stamps.start
            const end = stamps.end
            if (!start) return
            if (end) {
                // needs to be changed in future for spotify
                setElapsed(formatTime(start));
                return;
            }
            setElapsed(formatTime(start));
        }
        updateTimestamp();

        const timestampInterval = setInterval(() => updateTimestamp(), 1000);
        
        return () => {
            clearInterval(timestampInterval);
        };
    }, [stamps]);

    return elapsed;
}