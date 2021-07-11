import Head from "next/head";
import Link from "next/link";
import { Age, Github, GithubLink } from "../data/config";
import { Socials } from "../data/socials";
import parse from "node-html-parser";

interface Project {
    name: string;
    description: string;
    owner: string;
}

interface HomeProps {
    projects: Project[];
    age: number;
    github: string;
}

export const getStaticProps = async () => {
    const res = await fetch(GithubLink);
    const text = await res.text();

    const root = parse(text);

    const projects: Project[] = [];
    root.querySelectorAll(".pinned-item-list-item").forEach(async (project) => {
        const nameElement = project.querySelector(".repo");
        const ownerElement = project.querySelector(".owner");
        const descriptionElement = project.querySelector(
            ".pinned-item-desc.color-text-secondary.text-small.d-block.mt-2.mb-3"
        );
        const name = nameElement.textContent;
        const owner = ownerElement ? ownerElement.textContent : Github;
        const description = descriptionElement.textContent;
        projects.push({ name, owner, description });
    });

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
    return [
        <Head>
            <title>Home | Hexiro</title>
            <meta name="description" content={`Hi! I'm Hexiro, ${description}`} />
        </Head>,
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
                                    <a
                                        href={`https://github.com/${project.owner}/${project.name}`}
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {project.owner == github ? (
                                            <h3>{project.name}</h3>
                                        ) : (
                                            <h3>
                                                <span className="main-accent">
                                                    {project.owner}/
                                                </span>
                                                {project.name}
                                            </h3>
                                        )}
                                    </a>
                                </div>
                                <p>{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>,
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
        </footer>,
    ];
}
