import { useEffect, useState } from "react";

import { Timestamps } from "../types";

const relativeTime = (stamp: number): number => {
    return Math.floor((Date.now() - stamp) / 1000);
};

const formatSong = (start: number, end: number): JSX.Element => {
    let relStart = relativeTime(start);
    const relEnd = Math.floor((end - start) / 1000);
    if (relStart > relEnd) {
        relStart = relEnd;
    }
    return (
        <div className="song-outer-bar">
            <div
                className="song-inner-bar"
                style={{ width: `${(relStart / relEnd) * 100}%` }}
            ></div>
        </div>
    );
};

export const SongBar = ({ start, end }: Timestamps): JSX.Element | null => {
    const [elapsed, setElapsed] = useState<JSX.Element | null>(null);

    useEffect(() => {
        function updateTimestamp() {
            if (start && end) {
                setElapsed(formatSong(start, end));
                return;
            }
        }
        updateTimestamp();

        const timestampInterval = setInterval(() => updateTimestamp(), 1000);

        return () => {
            clearInterval(timestampInterval);
        };
    }, [start, end]);

    return elapsed;
};
