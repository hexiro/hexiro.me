import Head from "next/head";
import Link from "next/link";
import { Age, Github, GithubLink, GithubToken } from "../data/config";
import { Socials } from "../data/socials";

interface Project {
    name: string;
    descriptionHTML: string;
    url: string;
    owner: {
        login: string;
    };
    stargazers: {
        totalCount: number;
    };
    pullRequests: {
        totalCount: number;
    };
    issues: {
        totalCount: number;
    };
    primaryLanguage: {
        name: string;
    };
}

interface HomeProps {
    projects: Project[];
    age: number;
    github: string;
}

export const getStaticProps = async () => {
    const data = {
        query: `query {\nuser(login: "${Github}") {\npinnedItems(first: 3, types: REPOSITORY) {\nnodes {\n...on Repository {\nname\ndescriptionHTML\nurl\nowner {\nlogin\n}\nstargazers {\ntotalCount\n}\npullRequests {\ntotalCount\n}\nissues {\ntotalCount\n}\nprimaryLanguage {\nname\n}\n}\n}\n}\n}\n}`,
    };
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `token ${GithubToken}`,
        },
        body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(`token ${GithubToken}`)
    console.log(json)
    const projects: Project[] = json["data"]["user"]["pinnedItems"]["nodes"];

    return {
        props: {
            projects,
            age: Age(),
            github: Github,
        },
        revalidate: 3600,
    };
};

export default function Home({ projects, age, github }: HomeProps) {
    const description = `A ${age} y/o aspiring Software Engineer`;
    return (
        <>
            <Head>
                <title>Home | Hexiro</title>
                <meta name="description" content={`Hi! I'm Hexiro, ${description}`} />
            </Head>
            <main>
                <div className="left">
                    <div className="intro">
                        <h1>
                            Hi! I'm <span className="main-accent font-weight-400">Hexiro</span>,
                        </h1>
                        <h2>{description}</h2>
                    </div>
                </div>
                <div className="right">
                    <div className="projects">
                        {projects.map((project: Project) => (
                            <div className="projects-item transition">
                                <div className="projects-container">
                                    <div className="project-title main-color">
                                        <a href={project.url} rel="noreferrer" target="_blank">
                                            {project.owner.login == github ? (
                                                <h3>{project.name}</h3>
                                            ) : (
                                                <h3>
                                                    <span className="main-accent">
                                                        {project.owner.login}/
                                                    </span>
                                                    {project.name}
                                                </h3>
                                            )}
                                        </a>
                                    </div>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: project.descriptionHTML.slice(5, -6),
                                        }}
                                    ></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <footer>
                <ul className="social-media">
                    {Socials.map((social) => (
                        <li className="social-item">
                            <Link href={social.href}>
                                <a rel="noreferrer" target="_blank">
                                    {social.icon}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </footer>
        </>
    );
}
