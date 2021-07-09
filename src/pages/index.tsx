import Head from "next/head";
import Link from "next/link";
import { Age } from "../data/me";
import { Socials } from "../data/socials";
import { Projects } from "../data/projects";


export default function Home() {
    const description = `A ${Age} y/o aspiring Software Engineer`;
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
                {Projects.map((project) => (
                    <div className="projects-item transition">
                        <div className="projects-container">
                            <div className="project-title main-color">
                                <a href={project.href} rel="noreferer" target="_blank">
                                        <h3>{project.name}</h3>
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
                            <a rel="norefferer">{social.icon}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>,
    ];
}
