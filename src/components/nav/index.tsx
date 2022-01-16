import { useEffect, useState } from "react";

import hex from "commons/assets/hex";
import Section from "components/nav/section";

import { useWindowScroll } from "react-use";
import styled from "styled-components";

interface NavProps {
    meRef: React.MutableRefObject<HTMLElement | null>;
    projectsRef: React.MutableRefObject<HTMLElement | null>;
}

export default function Nav({ meRef, projectsRef }: NavProps): JSX.Element {
    const [active, setActive] = useState(0);
    const { y } = useWindowScroll();

    useEffect(() => {
        const currentMe = meRef.current;
        const currentProjects = projectsRef.current;

        if (!currentMe || !currentProjects) return;

        const value = y + 500;

        if (value >= currentProjects.offsetTop) setActive(1);
        else if (value >= currentMe.offsetTop) setActive(0);
    }, [y, meRef, projectsRef]);

    return (
        <NavContainer>
            {hex}
            <Sections>
                <Section name="me" highlighted={active === 0} />
                <Section name="projects" highlighted={active === 1} />
            </Sections>
        </NavContainer>
    );
}

const NavContainer = styled.nav`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 20px;
    z-index: 2;
    transition: ease all 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

const Sections = styled.ul`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    right: 20px;
    list-style: none;
`;
