import React, { useRef, useEffect, useState } from "react";

import Page from "components/pages";

import { useWindowScroll } from "react-use";
import { Me, Nav, Projects } from "sections";

export default function Home(): JSX.Element {
    const meRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);

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
            <Me ref={meRef} />
            <Projects ref={projectsRef} />
        </Page>
    );
}
