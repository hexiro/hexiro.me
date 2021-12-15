import { useEffect, useState } from "react";

import theme from "commons/theme";

import { Timestamps } from "react-use-lanyard";
import styled from "styled-components";

export default function SongBar(timestamps: Timestamps | undefined): JSX.Element | null {
    const [time, setTime] = useState(Date.now());

    const start = timestamps?.start;
    const end = timestamps?.end;

    useEffect(() => {
        if (!(start && end)) return;
        const interval = setInterval(() => { setTime(Date.now()); }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [start, end]);

    if (!start) return null;
    if (!end) return null;

    const relativeEnd = Math.floor((end - start) / 1000);
    const relativeStart = time > end ? relativeEnd : Math.floor((time - start) / 1000);

    return (
        <SongBarContainer>
            <OuterBar>
                <InnerBar start={relativeStart} end={relativeEnd} />
            </OuterBar>
        </SongBarContainer>
    );
}

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
