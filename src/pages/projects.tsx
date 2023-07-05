import type { GetStaticProps } from "next";

import { H1, H3 } from "@/components/ui/Headings";

import { ProjectCard } from "@/components/cards/ProjectCard";

import type { IProject } from "@/data/projects";
import { fetchProjects } from "@/data/projects";

interface ProjectsPageProps {
    projects: IProject[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    return (
        <>
            <H1>Projects</H1>
            <H3 className="text-subtitle">My open-source projects.</H3>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:flex-wrap ">
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
