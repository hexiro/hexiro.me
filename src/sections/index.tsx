import { Me } from "./Me";
import { Projects } from "./Projects";
import styled from "styled-components";

interface SectionProps {
    meRef: React.MutableRefObject<HTMLElement | null>;
    projectsRef: React.MutableRefObject<HTMLElement | null>;
}

export default function ({ meRef, projectsRef }: SectionProps): JSX.Element {
    return (
        <Sections>
            <Me ref={meRef} />
            <Projects ref={projectsRef} />
        </Sections>
    );
}

const Sections = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 50px;
    margin-top: 100px;
`;
