import { VerticalDivider } from "@/components/layout/Divider";
import { ExternalLinkOverlay } from "@/components/layout/Overlay";
import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";
import { ExternalLinkIcon, PackageIcon, StarsIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";
import { Topic } from "@/components/ui/Topics";

import type { IProject } from "@/data/projects";

import { twMerge } from "tailwind-merge";

interface ProjectCardProps {
    readonly project: IProject;
    readonly className?: string;
    readonly showLastUpdated?: boolean;
}

export function ProjectCard({ project, className, showLastUpdated }: ProjectCardProps) {
    const { name, url, description, stars, packageUrl, languages, topics, updatedAt } = project;

    return (
        <Card isHoverable isFocusable as="li" className={twMerge("w-full pr-4", className)}>
            <div className="mb-1 flex h-10 flex-row items-center gap-x-2 leading-none">
                <H5 green className="basis-2/3 truncate text-[18px] lg:text-[20px]">
                    <ExternalLinkOverlay href={url} aria-label={`open project, ${name}, on GitHub`}>
                        {name}
                    </ExternalLinkOverlay>
                </H5>
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
                            <li className="contents">
                                <ExternalLink
                                    isHoverable
                                    isFocusable
                                    href={packageUrl}
                                    aria-label={`open ${project} package website`}
                                >
                                    <PackageIcon />
                                </ExternalLink>
                            </li>
                        ) : null}
                        <li className="contents">
                            <ExternalLink
                                isHoverable
                                isFocusable={packageUrl !== null}
                                href={url}
                                aria-label={`open project, ${name}, on GitHub`}
                            >
                                <ExternalLinkIcon />
                            </ExternalLink>
                        </li>
                    </ul>
                </span>
            </div>
            <div className="flex flex-col gap-y-4 pr-4">
                <p className="line-clamp-3 min-h-[70px] text-pretty">
                    {description.map(({ value, type }) =>
                        type === "link" ? (
                            <ExternalLink
                                key={value}
                                isHoverable
                                isFocusable
                                href={value}
                                aria-label="open external source"
                                className="relative z-10 px-0.5 normal-case text-green"
                            >
                                {value}
                            </ExternalLink>
                        ) : (
                            <span key={value}>{value}</span>
                        )
                    )}
                </p>
                <div className="flex flex-col gap-y-2">
                    <ul className="flex h-[26px] flex-row flex-wrap gap-x-2 overflow-hidden leading-none">
                        {languages.map((name) => (
                            <Topic key={name} isLanguage name={name} />
                        ))}
                        {topics.map((name) => (
                            <Topic key={name} name={name} />
                        ))}
                    </ul>
                    {showLastUpdated ? (
                        <span className="font-mono text-xs font-semibold leading-none">
                            <span className="text-text">Last Updated:</span>{" "}
                            <span className="text-text/75">
                                {new Date(updatedAt).toLocaleDateString()}
                            </span>
                        </span>
                    ) : null}
                </div>
            </div>
        </Card>
    );
}
