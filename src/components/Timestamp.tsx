import { useEffect, useState } from "react";

import { Timestamps } from "react-use-lanyard";

const relativeTime = (stamp: number): number => {
    return Math.floor((Date.now() - stamp) / 1000);
};

const songDuration = (stamp: number): string => {
    const quotient = Math.floor(stamp / 60);
    const remainder = stamp % 60;
    return `${quotient}:${String(remainder).padStart(2, "0")}`;
};

const formatElapsed = (start: number): JSX.Element => {
    const rel = relativeTime(start);
    let hours = Math.floor(rel / 3600);
    let minutes = Math.floor(rel / 60) % 60;
    let seconds = rel % 60;
    let formatted = [hours, minutes, seconds]
        .map((v) => ("" + v).padStart(2, "0"))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    if (!formatted) formatted = "00:00";
    return <h5>{`${formatted} elapsed`}</h5>;
};

const formatSong = (start: number, end: number): JSX.Element => {
    let relStart = relativeTime(start);
    const relEnd = Math.floor((end - start) / 1000)
    if (relStart > relEnd) {
        relStart = relEnd;
    }
    const width = relStart / relEnd;
    return (
        <div className="song-details">
            <div className="song-text">
                <h6>{songDuration(relStart)}</h6>
                <h6 className="song-end-text">{songDuration(relEnd)}</h6>
            </div>
            <div className="song-outer-bar">
                <div className="song-inner-bar" style={{ width: `${width * 100}%` }}></div>
            </div>
        </div>
    );
};

export default function Timestamper(stamps: Timestamps | undefined): JSX.Element {
    const [elapsed, setElapsed] = useState(<></>);

    useEffect(() => {
        function updateTimestamp() {
            if (!stamps) return;
            const start = stamps.start;
            const end = stamps.end;
            if (!start) return;
            if (end) {
                setElapsed(formatSong(start, end));
                return;
            }
            setElapsed(formatElapsed(start));
        }
        updateTimestamp();

        const timestampInterval = setInterval(() => updateTimestamp(), 1000);

        return () => {
            clearInterval(timestampInterval);
        };
    }, [stamps]);

    return elapsed;
}
