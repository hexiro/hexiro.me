// import { styled } from "@/theme";
import { VerticalDivider } from "@/components/layout/Divider";
import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H4 } from "@/components/ui/Headings";
import { ExternalLinkIcon, PackageIcon, StarsIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";

import type { IProject } from "@/data/projects";

import { twMerge } from "tailwind-merge";

interface ProjectCardProps {
    className?: string;
    project: IProject;
}

export function ProjectCard({ className, project }: ProjectCardProps) {
    const { name, url, description, stars, packageUrl, topics } = project;

    return (
        <Card isHoverable className={twMerge("w-full pr-4", className)}>
            <div className="mb-1 flex h-10 flex-row items-center gap-x-2 leading-none">
                <H4 green className="basis-2/3 truncate">
                    <ExternalLinkOverlay href={url}>{name}</ExternalLinkOverlay>
                </H4>
                <span className="flex h-full basis-1/3 flex-row items-center justify-end gap-x-3">
                    {stars > 0 ? (
                        <>
                            <div className="flex flex-row items-center gap-x-[1px]">
                                <StarsIcon />
                                <p className="leading-none text-off-white">{stars}</p>
                            </div>
                            <VerticalDivider className="h-2/3" />
                        </>
                    ) : null}
                    <ul className="z-10 flex gap-x-1">
                        {packageUrl !== null ? (
                            <li className="flex items-center transition-transform hover:translate-y-[-2px]">
                                <ExternalLink href={packageUrl}>
                                    <PackageIcon />
                                </ExternalLink>
                            </li>
                        ) : null}
                        <li className="flex items-center transition-transform hover:translate-y-[-2px]">
                            <ExternalLink href={url}>
                                <ExternalLinkIcon />
                            </ExternalLink>
                        </li>
                    </ul>
                </span>
            </div>
            <div className="flex flex-col gap-y-4 pr-4">
                <p className="line-clamp-3 min-h-[70px]">
                    {description.map(({ value, type }) =>
                        type === "link" ? (
                            <ExternalLink key={value} className="z-10" href={value}>
                                {value}
                            </ExternalLink>
                        ) : (
                            <span key={value}>{value}</span>
                        )
                    )}
                </p>
                <ul className="flex h-[26px] flex-row flex-wrap gap-x-2 overflow-hidden leading-none">
                    {topics.map((name) => (
                        <li
                            key={name}
                            className="relative flex flex-row items-center rounded-md border-2 border-solid border-white/10 bg-background-light-accent px-2 py-1 font-sans text-sm font-bold text-white/50"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
