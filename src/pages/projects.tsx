import type { GetStaticProps } from "next";

import { topicFilterAtom } from "@/commons/atoms";

import { H1, H3, H5 } from "@/components/ui/Headings";
import { TagIcon } from "@/components/ui/Icons";

import { ProjectCard } from "@/components/cards/ProjectCard";

import type { IProject } from "@/data/projects";
import { fetchProjects } from "@/data/projects";

import { LayoutGroup, motion } from "framer-motion";
import { useAtom } from "jotai";

interface ProjectsPageProps {
    projects: IProject[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
    const [topicFilter, setTopicFilter] = useAtom(topicFilterAtom);

    const filteredProjects = topicFilter
        ? projects.filter(({ topics }) => topics.map(({ name }) => name).includes(topicFilter))
        : projects;

    const clearTopicFilter = () => setTopicFilter(null);

    return (
        <>
            <div className="mb-12">
                <H1>Projects</H1>
                <H3 className="text-subtitle">My open-source projects.</H3>
            </div>
            {topicFilter ? (
                <div className="mb-2 flex flex-row items-center gap-x-2">
                    <TagIcon className="stroke-[2.5]" />
                    <H5 className="font-bold text-off-white">
                        Projects with{" "}
                        <span className="font-extrabold text-green">
                            &apos;{topicFilter}&apos;{" "}
                        </span>
                        topic
                    </H5>
                </div>
            ) : null}
            <motion.div layout className="flex flex-col gap-6 md:flex-row md:flex-wrap ">
                <LayoutGroup>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </LayoutGroup>
            </motion.div>
        </>
    );
}

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => ({
    props: {
        projects: await fetchProjects(),
    },
    revalidate: 60 * 60,
});
