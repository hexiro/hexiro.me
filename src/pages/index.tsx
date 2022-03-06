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
        fallbackInView: true,
    };

    const [meRef, meInView, meCurrent] = useInView(useInViewOptions);
    const [projectsRef, projectsInView, projectsCurrent] = useInView(useInViewOptions);
    const [contributionsRef, contributionsInView, contributionsCurrent] =
        useInView(useInViewOptions);

    const description =
        "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

    return (
        <Page name="Home" description={`Hi! I'm Hexiro, ${description}`}>
            <Nav
                me={meCurrent}
                meInView={meInView}
                projects={projectsCurrent}
                projectsInView={projectsInView}
                contributions={contributionsCurrent}
                contributionsInView={contributionsInView}
            />
            <Sections>
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
