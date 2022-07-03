import { memo } from "react";

import { VStack } from "@chakra-ui/react";

import type { ProjectWithContribution } from "commons/graphql/contributions";
import type { Project } from "commons/graphql/projects";
import type { InViewHookResponse } from "react-intersection-observer";
import { Contributions } from "sections/contributions";
import { Me } from "sections/me";
import { Projects } from "sections/projects";

interface ContentProps {
    meRef: InViewHookResponse["ref"];
    projectsRef: InViewHookResponse["ref"];
    contributionsRef: InViewHookResponse["ref"];
    description: string;
    projects: Project[];
    projectsWithContribution: ProjectWithContribution[];
}

const Content = ({
    meRef,
    projectsRef,
    contributionsRef,
    description,
    projects,
    projectsWithContribution,
}: ContentProps) => (
    <VStack spacing={20} _first={{ paddingTop: 40 }} _last={{ paddingBottom: 40 }}>
        <Me ref={meRef} description={description} />
        <Projects ref={projectsRef} projects={projects} />
        <Contributions ref={contributionsRef} projectsWithContribution={projectsWithContribution} />
    </VStack>
);

export default memo(Content);
