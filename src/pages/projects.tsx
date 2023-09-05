import type { GetStaticProps } from "next";

import { H1, H3 } from "@/components/ui/Headings";

import { ProjectCard } from "@/components/cards/ProjectCard";

import type { IProject } from "@/data/projects";
import { fetchProjects } from "@/data/projects";

import { Seo } from "@/layout/Seo";

interface ProjectsPageProps {
    readonly projects: IProject[];
}

const NAME = "Projects";
const DESCRIPTION = "My open-source projects.";

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    return (
        <>
            <Seo name={NAME} description={DESCRIPTION} />
            <div className="mb-12">
                <H1>{NAME}</H1>
                <H3 className="text-subtitle">{DESCRIPTION}</H3>
            </div>
            <div className="grid auto-cols-fr gap-6 md:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => ({
    props: {
        projects: await fetchProjects(),
    },
    revalidate: 60 * 60,
});
