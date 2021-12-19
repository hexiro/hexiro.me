import styled from "styled-components";

export { Me } from "sections/me";
export { Projects } from "sections/projects";

const Sections = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 2%;
    margin-top: 100px;

    & > :first-child {
        margin-top: unset;
    }
    & > section {
        margin-top: 150px;
    }
`;
export default Sections;
