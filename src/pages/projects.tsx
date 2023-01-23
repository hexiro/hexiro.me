import { styled } from "@/theme";

import Project from "@/components/project";
import { Heading, Subtext } from "@/components/ui";
import Page from "@/layout/Page";

const DESCRIPTION = "Projects";

export default function Projects() {
    return (
        <Page name="Projects" description={DESCRIPTION}>
            <Heading as="h1">Projects</Heading>
            <Subtext>
                I have hand-picked these top six projects to showcase my skill set and creativity. I
                host each project on GitHub.
            </Subtext>
            <ProjectsContainer>
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
            </ProjectsContainer>
        </Page>
    );
}

const ProjectsContainer = styled("div", {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: "2%",
    rowGap: "$4",
    marginTop: "6em",
});
