import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

import Page from "components/pages";

import { useWindowScroll } from "react-use";
import { Me, Nav, Projects } from "sections";
import styled from "styled-components";

export default function Home(): JSX.Element {
    const meRef = useRef<HTMLElement | null>(null);
    const projectsRef = useRef<HTMLElement | null>(null);

    const [active, setActive] = useState(0);

    const { y } = useWindowScroll();

    useEffect(() => {
        const me = meRef.current;
        const projects = projectsRef.current;

        if (!me || !projects) return;

        const value = y + 500;

        if (value >= projects.offsetTop) setActive(1);
        else if (value >= me.offsetTop) setActive(0);
    }, [y]);

    return (
        <Page name="Home" description="desc">
            <Nav active={active} />
            <Sections>
                <Me ref={meRef} />
                <Projects ref={projectsRef} />
            </Sections>
        </Page>
    );
}

const Sections = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 50px;
    margin-top: 200px;
`;
