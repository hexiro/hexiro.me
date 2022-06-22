import type { GetStaticProps } from "next";

import type { RepositoryProps, PullRequestProps } from "commons/graphql";
import contributions from "commons/graphql/contributions";
import projects from "commons/graphql/projects";
import { Contributions } from "sections/contributions";
import { Me } from "sections/me";
import Nav from "sections/nav";
import { Projects } from "sections/projects";

import { VStack } from "@chakra-ui/react";
import { Page } from "layout/Page";
import mainPy from "py/main.py";
import type { IntersectionOptions } from "react-intersection-observer";
import { useInView } from "react-intersection-observer";

interface HomeProps {
    projectsRepositories: RepositoryProps[];
    contributionsPullRequests: PullRequestProps[];
}

export default function Home({ projectsRepositories, contributionsPullRequests }: HomeProps) {
    const useInViewOptions: IntersectionOptions = {
        threshold: 0.3,
        fallbackInView: true,
    };

    const [meRef, meInView, meCurrent] = useInView(useInViewOptions);
    const [projectsRef, projectsInView, projectsCurrent] = useInView(useInViewOptions);
    const [contributionsRef, contributionsInView, contributionsCurrent] =
        useInView(useInViewOptions);

    const description =
        "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

    console.log({ mainPy });

    return (
        <Page name="Home" description={`Hi! I'm Hexiro, ${description}`}>
            <Nav
                sections={{
                    me: { inView: meInView, current: meCurrent },
                    projects: { inView: projectsInView, current: projectsCurrent },
                    contributions: { inView: contributionsInView, current: contributionsCurrent },
                }}
            />
            <VStack spacing={20} _first={{ paddingTop: 40 }} _last={{ paddingBottom: 40 }}>
                <Me ref={meRef} inView={meInView} description={description} />
                <Projects
                    ref={projectsRef}
                    inView={projectsInView}
                    repositories={projectsRepositories}
                />
                <Contributions
                    ref={contributionsRef}
                    inView={contributionsInView}
                    pullRequests={contributionsPullRequests}
                />
            </VStack>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
    props: {
        projectsRepositories: await projects(),
        contributionsPullRequests: await contributions(),
    },
    revalidate: 3600,
});
