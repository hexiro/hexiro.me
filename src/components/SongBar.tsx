import { useEffect, useState } from "react";

import { Timestamps } from "types";

import theme from "data/theme";

import styled from "styled-components";

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
        <Container>
            <OuterBar>
                <InnerBar start={relStart} end={relEnd}></InnerBar>
            </OuterBar>
        </Container>
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

const Container = styled.div`
    position: absolute;
    bottom: 0;
    padding: 0;
    margin: 0 -20px;
    width: 100%;
`;

const OuterBar = styled.div`
    height: 4px;
    border-radius: 2px;
    background-color: ${theme.core.background};
`;

const InnerBar = styled.div<{ start: number; end: number }>`
    background-color: ${theme.core.text};
    height: 100%;
    width: ${({ start, end }) => (start / end) * 100}%;
`;
