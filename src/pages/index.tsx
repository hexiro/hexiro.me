import type { GetStaticProps } from "next";

import type { RepositoryProps, PullRequestProps } from "commons/graphql";
import contributions from "commons/graphql/contributions";
import projects from "commons/graphql/projects";
import { Page } from "layout/Page";
import type { IntersectionOptions } from "react-intersection-observer";
import { useInView } from "react-intersection-observer";
import Content from "sections/me/Content";
import Nav from "sections/nav";

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

    return (
        <Page name="Home" description={`Hi! I'm Hexiro, ${description}`}>
            <Nav
                sections={{
                    me: { inView: meInView, current: meCurrent },
                    projects: { inView: projectsInView, current: projectsCurrent },
                    contributions: { inView: contributionsInView, current: contributionsCurrent },
                }}
            />
            <Content
                meRef={meRef}
                description={description}
                projectsRef={projectsRef}
                projectsRepositories={projectsRepositories}
                contributionsRef={contributionsRef}
                contributionsPullRequests={contributionsPullRequests}
            />
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
