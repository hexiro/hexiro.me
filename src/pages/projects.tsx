import type { GetStaticProps } from "next";
import { useState } from "react";

import { H1, H3 } from "@/components/ui/Headings";
import { TopicButton } from "@/components/ui/Topics";

import ButtonCard from "@/components/cards/ButtonCard";
import { ProjectCard } from "@/components/cards/ProjectCard";

import type { IProject } from "@/data/projects";
import { fetchProjects } from "@/data/projects";

import { Seo } from "@/layout/Seo";

import { twMerge } from "tailwind-merge";

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
            <ProjectsSection projects={projects} />
        </>
    );
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => ({
    props: {
        projects: await fetchProjects(),
    },
    revalidate: 60 * 60,
});

interface ProjectsSectionProps {
    readonly projects: IProject[];
}

enum ProjectSortMethod {
    Pinned,
    Date,
    Popularity,
}

function ProjectsSection({ projects: initialProjects }: ProjectsSectionProps) {
    const [sortMethod, setSortMethod] = useState<ProjectSortMethod>(ProjectSortMethod.Pinned);
    const [showAll, setShowAll] = useState<boolean>(false);

    const filter = (projects: IProject[]) => {
        if (showAll) return projects;
        return projects.filter((project) => project.pinnedIndex !== null);
    };

    const sort = (projects: IProject[]) => {
        let sortFunction: (a: IProject, b: IProject) => number;

        switch (sortMethod) {
            case ProjectSortMethod.Pinned:
                sortFunction = (a, b) => {
                    if (a.pinnedIndex !== null && b.pinnedIndex !== null)
                        return a.pinnedIndex - b.pinnedIndex;
                    if (a.pinnedIndex !== null) return -1;
                    if (b.pinnedIndex !== null) return 1;
                    return b.stars - a.stars;
                };

                break;
            case ProjectSortMethod.Date:
                sortFunction = (a, b) =>
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                break;
            case ProjectSortMethod.Popularity:
                sortFunction = (a, b) => b.stars - a.stars;
                break;
        }

        return projects.sort(sortFunction);
    };

    let projects = [...initialProjects];
    projects = filter(projects);
    projects = sort(projects);

    return (
        <>
            <div className="mb-6 flex flex-col items-end justify-center gap-3 sm:flex-row sm:items-center sm:justify-end">
                <span className="font-mono font-extrabold uppercase leading-none text-text">
                    Sort:{" "}
                </span>
                <ul className="flex flex-row gap-x-2">
                    {Object.entries(ProjectSortMethod)
                        .filter(
                            (entry): entry is [string, ProjectSortMethod] =>
                                typeof entry[1] === "number" && !isNaN(entry[1])
                        )
                        .map(([key, value]) => (
                            <TopicButton
                                key={key}
                                name={key}
                                isSelected={sortMethod === value}
                                onClick={() => setSortMethod(value)}
                            />
                        ))}
                </ul>
            </div>
            <ul
                className={twMerge(
                    "mb-7 grid auto-cols-fr gap-6 md:grid-cols-2",
                    showAll && "xl:grid-cols-3"
                )}
            >
                {projects.map((project) => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        showLastUpdated={sortMethod === ProjectSortMethod.Date}
                    />
                ))}
            </ul>
            <ButtonCard className="w-full" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Only show pinned projects" : "View all projects"}
            </ButtonCard>
        </>
    );
}
