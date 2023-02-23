import type { GetStaticProps } from "next";

import BrandedBoxContainer from "@/components/BrandedBoxContainer";
import Project from "@/components/projects/Project";

import type { ProjectData } from "@/data/projects";
import fetchProjects from "@/data/projects";

import Page from "@/layout/Page";

interface ProjectsProps {
    projects: ProjectData[];
}

const NAME = "Projects";
const DESCRIPTION =
    "I hand-picked these six projects to showcase my skill set and creativity. I host each project on GitHub.";

export default function ProjectsPage({ projects }: ProjectsProps) {
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <BrandedBoxContainer>
                {projects.map((project) => (
                    <Project key={project.name} data={project} />
                ))}
            </BrandedBoxContainer>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => ({
    props: {
        projects: await fetchProjects(),
    },
    revalidate: 60 * 60,
});
