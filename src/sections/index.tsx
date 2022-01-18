import styled from "styled-components";

export { Me } from "sections/me";
export { Projects } from "sections/projects";
export { Contributions } from "sections/contributions";

const Sections = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 2%;
    & > section {
        margin-top: 140px;
    }
`;
export default Sections;
