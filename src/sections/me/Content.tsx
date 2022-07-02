import { memo } from "react";

import { VStack } from "@chakra-ui/react";

import type { RepositoryProps, PullRequestProps } from "commons/graphql";
import type { InViewHookResponse } from "react-intersection-observer";
import { Contributions } from "sections/contributions";
import { Me } from "sections/me";
import { Projects } from "sections/projects";

interface ContentProps {
    meRef: InViewHookResponse["ref"];
    description: string;
    projectsRef: InViewHookResponse["ref"];
    projectsRepositories: RepositoryProps[];
    contributionsRef: InViewHookResponse["ref"];
    contributionsPullRequests: PullRequestProps[];
}

const Content = ({
    meRef,
    description,
    projectsRef,
    projectsRepositories,
    contributionsRef,
    contributionsPullRequests,
}: ContentProps) => (
    <VStack spacing={20} _first={{ paddingTop: 40 }} _last={{ paddingBottom: 40 }}>
        <Me ref={meRef} description={description} />
        <Projects ref={projectsRef} repositories={projectsRepositories} />
        <Contributions ref={contributionsRef} pullRequests={contributionsPullRequests} />
    </VStack>
);

export default memo(Content);
