// import { styled } from "@/theme";
import Link from "next/link";

import { VerticalDivider } from "@/components/layout/Divider";
import { LinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { H4 } from "@/components/ui/Headings";
import { ExternalLinkIcon, PackageIcon, StarsIcon } from "@/components/ui/Icons";

import type { IProject } from "@/data/projects";

import { twMerge } from "tailwind-merge";

interface ProjectCardProps {
    className?: string;
    project: IProject;
}

export function ProjectCard({ className, project }: ProjectCardProps) {
    const { name, url, description, stars, packageUrl, topics } = project;

    return (
        <Card isHoverable className={twMerge("w-full md:w-[calc(50%-1rem)] pr-4", className)}>
            <div className="flex flex-row align-center h-10 pb-1 gap-x-2">
                <H4 green className="truncate basis-2/3">
                    <LinkOverlay href={url}>{name}</LinkOverlay>
                </H4>
                <span className="basis-1/3 flex flex-row items-center justify-end h-full gap-x-3">
                    {stars > 0 ? (
                        <>
                            <div className="flex flex-row items-center gap-x-[1px]">
                                <StarsIcon />
                                <p className="leading-none text-off-white">{stars}</p>
                            </div>
                            <VerticalDivider className="h-2/3" />
                        </>
                    ) : null}
                    <ul className="flex gap-x-1 z-10">
                        {packageUrl !== null ? (
                            <li className="flex items-center transition-transform hover:translate-y-[-2px]">
                                <Link href={packageUrl}>
                                    <PackageIcon />
                                </Link>
                            </li>
                        ) : null}
                        <li className="flex items-center transition-transform hover:translate-y-[-2px]">
                            <Link href={url}>
                                <ExternalLinkIcon />
                            </Link>
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
                <ul className="flex flex-row flex-wrap h-[26px] gap-x-2 leading-none overflow-hidden">
                    {topics.map((name) => (
                        <li
                            key={name}
                            className="relative flex flex-row items-center bg-background-light-accent px-2 py-1 border-2 border-solid border-white/10 rounded-md font-bold text-white/50 font-sans text-sm"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
