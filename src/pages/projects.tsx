import { Heading, Subheading, Subtext } from "@/components/ui";
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
        </Page>
    );
}
