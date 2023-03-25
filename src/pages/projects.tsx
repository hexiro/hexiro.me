import type { GetStaticProps } from "next";

import { Container } from "@/components/brand";
import Project from "@/components/projects/Project";

import type { ProjectData } from "@/data/projects";
import fetchProjects from "@/data/projects";

import Page, { PageDescription, PageHeading, PageText } from "@/layout/Page";

interface ProjectsPageProps {
    projects: ProjectData[];
}

const NAME = "Projects";
const DESCRIPTION =
    "I hand-picked these six projects to showcase my skill set and creativity. I host each project on GitHub.";

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <PageText>
                <PageHeading>{NAME}</PageHeading>
                <PageDescription>{DESCRIPTION}</PageDescription>
            </PageText>
            <Container>
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </Container>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => ({
    props: {
        projects: await fetchProjects(),
    },
    revalidate: 60 * 60,
});
