import type { GetStaticProps } from "next";

import type { ProjectWithContribution } from "commons/graphql/contributions";
import contributions from "commons/graphql/contributions";
import type { Project } from "commons/graphql/projects";
import projects from "commons/graphql/projects";
import { Page } from "layout/Page";
import type { IntersectionOptions } from "react-intersection-observer";
import { useInView } from "react-intersection-observer";
import Content from "sections/me/Content";
import Nav from "sections/nav";

interface HomeProps {
    projects: Project[];
    projectsWithContribution: ProjectWithContribution[];
}

const DESCRIPTION =
      "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

export default function Home({ projects, projectsWithContribution }: HomeProps) {
    const useInViewOptions: IntersectionOptions = {
        threshold: 0.3,
        fallbackInView: true,
    };

    const [meRef, meInView, meCurrent] = useInView(useInViewOptions);
    const [projectsRef, projectsInView, projectsCurrent] = useInView(useInViewOptions);
    const [contributionsRef, contributionsInView, contributionsCurrent] =
        useInView(useInViewOptions);

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
                projectsRef={projectsRef}
                contributionsRef={contributionsRef}
                description={DESCRIPTION}
                projects={projects}
                projectsWithContribution={projectsWithContribution}
            />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
    props: {
        projects: await projects(),
        projectsWithContribution: await contributions(),
    },
    revalidate: 3600,
});
