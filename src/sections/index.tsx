import styled from "styled-components";

export { Me } from "sections/me";
export { Projects } from "sections/projects";
export { Contributions } from "sections/contributions";

const Sections = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 10%;
    & > section {
        padding-top: 150px;
    }
    & > section:last-child {
        padding-bottom: 50px;
    }
    @media only screen and (max-width: 900px) {
        margin: 0 5%;
    }
`;

export interface SectionProps {
    inView: boolean;
}

export default Sections;
