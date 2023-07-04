import type { GetStaticProps } from "next";

import { ProjectCard } from "@/components/projects/ProjectCard";

import type { IProject } from "@/data/projects";
import { fetchProjects } from "@/data/projects";

interface ProjectsPageProps {
    projects: IProject[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    return (
        <>
            <h1>Projects</h1>
            <h3 className="text-subtitle">My open-source projects.</h3>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-4">
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
