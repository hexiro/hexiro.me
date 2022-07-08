import type { Flex } from "@chakra-ui/react";
import { forwardRef } from "@chakra-ui/react";

import type { Project } from "commons/graphql/projects";
import RepositoryContainer from "components/RepositoryContainer";
import RepositorySection from "components/RepositorySection";
import RepositorySectionText from "components/RepositorySectionText";
import Repository from "components/repository";

interface ProjectsProps {
    projects: Project[];
}

export const Projects = forwardRef<ProjectsProps, typeof Flex>(({ projects }, ref) => (
    <RepositorySection ref={ref} id="projects">
        <RepositorySectionText
            title="Projects"
            description="These projects are my top 6 pinned repositories on GitHub. I specifically
                    hand-picked each repository as they nicely display my skill set and creativity."
        />
        <RepositoryContainer>
            {projects.map(project => (
                <Repository key={project.name} details={project} />
            ))}
        </RepositoryContainer>
    </RepositorySection>
));
