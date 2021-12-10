import { useEffect, useState } from "react";

import theme from "commons/theme";
import { Timestamps } from "react-use-lanyard";
import styled from "styled-components";

export default function SongBar(timestamps: Timestamps | undefined): JSX.Element | null {
    const [elapsed, setElapsed] = useState<JSX.Element | null>(null);

    const start = timestamps?.start;
    const end = timestamps?.end;

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
}

const formatSong = (start: number, end: number): JSX.Element => {
    end = Math.floor((end - start) / 1000);
    start = Math.floor((Date.now() - start) / 1000);
    if (start > end) {
        start = end;
    }
    return (
        <SongBarContainer>
            <OuterBar>
                <InnerBar start={start} end={end}></InnerBar>
            </OuterBar>
        </SongBarContainer>
    );
};

const SongBarContainer = styled.div`
    position: absolute;
    overflow: hidden;
    bottom: 0;
    padding: 0;
    left: 0;
    width: 100%;
`;

const OuterBar = styled.div`
    position: relative;
    overflow: hidden;
    height: 4px;
    border-radius: 0 0 2px 2px;
    background-color: ${theme.core.background};
`;

const InnerBar = styled.div<{ start: number; end: number }>`
    width: ${({ start, end }) => (start / end) * 100}%;
    height: 100%;
    border-radius: 0 2px 2px 2px;
    overflow: hidden;
    background-color: ${theme.core.text};
`;
