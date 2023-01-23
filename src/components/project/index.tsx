import { styled } from "@/theme";

export default function Project() {
    return (
        <ProjectContainer>
            <div>Project</div>
        </ProjectContainer>
    );
}

const ProjectContainer = styled("div", {
    aspectRatio: "800 / 280",
    width: "49%",
    height: "auto",
    backgroundColor: "$background-secondary",
    borderRadius: "$xxl",
    border: "2px solid $lighten-10",
    boxShadow: "$md",
    padding: "$4",
    display: "flex",
    flexDirection: "column",

    willTransition: "transform",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",
});
