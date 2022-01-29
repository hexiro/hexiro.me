import type { GetStaticProps } from "next";

import type { RepositoryProps, PullRequestProps } from "commons/graphql";
import contributions from "commons/graphql/contributions";
import projects from "commons/graphql/projects";
import { Page } from "components/pages";
import Sections, { Contributions, Me, Projects } from "sections";
import Nav from "sections/nav";

import { useInView } from "react-intersection-observer";

interface HomeProps {
    projectsRepositories: RepositoryProps[];
    contributionsPullRequests: PullRequestProps[];
}

export default function Home({ projectsRepositories, contributionsPullRequests }: HomeProps) {
    const useInViewOptions = {
        threshold: 0.3,
        triggerOnce: true,
        fallbackInView: true,
    };

    const [meRef, meInView, meCurrent] = useInView(useInViewOptions);
    const [projectsRef, projectsInView, projectsCurrent] = useInView(useInViewOptions);
    const [contributionsRef, contributionsInView, contributionsCurrent] =
        useInView(useInViewOptions);

    // TODO: use inView for nav bar

    return (
        <Page name="Home" description="desc">
            <Nav me={meCurrent} projects={projectsCurrent} contributions={contributionsCurrent} />
            <Sections>
                <Me ref={meRef} inView={meInView} />
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
            </Sections>
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
