import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import Nav from "components/nav";
import Page from "components/pages";

import { useWindowScroll } from "react-use";
import styled from "styled-components";

export default function Home(): JSX.Element {
    const meRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

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
            <TempMe id="me" ref={meRef} />
            <TempProjects id="projects" ref={projectsRef} />
        </Page>
    );
}
const TempProjects = styled.div`
    height: 20px;
    width: 100vw;
    background: wheat;
    margin: 700px 200px 2000px 0;
`;

const TempMe = styled.div`
    height: 20px;
    width: 100vw;
    background: red;
    margin-top: 200px;
    margin: 200px 200px 200px 0;
`;

// const FadingParent = styled(motion.div).attrs(() => ({
//     initial: "start",
//     animate: "fade",
//     variants: fadeParent,
// }));

// const Main = styled.main`
//     display: flex;
//     align-content: center;
//     min-height: 100vh;
//     height: 100%;

//     @media only screen and (max-width: 1250px) {
//         padding-top: 125px;
//         display: block;
//         min-height: 84vh;
//     }
// `;

// // prettier-ignore
// const Side = styled.div<{ left: true } | { right: true }>`
//     display: flex;
//     flex: 1;
//     align-items: center;
//     ${(props) => "right" in props && css`
//             justify-content: center;
//             margin: 20px 0;
//       `}

//     @media only screen and (max-width: 1250px) {
//         display: block;
//         text-align: center;
//         margin: 0;
//     }
// `;

// // transform makes it so the vertical centering is centered around the description line
// // instead of around the whole div
// const Intro = FadingParent`
//     line-height: 3em;
//     margin-left: 30px;
//     min-height: 115px;
//     position: relative;
//     transform: translateY(-20%);

//     @media only screen and (max-width: 1250px) {
//         margin-left: unset;
//     }
// `;

// const Projects = FadingParent`
//     @media only screen and (max-width: 1250px) {
//         display: block;
//     }
// `;

// // regen top 3 pinned repos every hour
// export const getStaticProps: GetStaticProps = async () => {
//     const resp = await graphQL(PROJECTS);
//     const json = await resp.json();
//     const projects: ProjectProps[] = json["data"]["viewer"]["pinnedItems"]["nodes"];

//     return {
//         props: {
//             projects,
//         },
//         revalidate: 3600,
//     };
// };
