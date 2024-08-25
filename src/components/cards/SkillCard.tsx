import type { ISkill } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

interface SocialCardProps {
    readonly skill: ISkill;
    readonly className?: string;
}

export default function SkillCard({ skill, className }: SocialCardProps) {
    const { icon: Icon, name, link } = skill;

    return (
        <Card
            isHoverable
            isFocusable
            as="li"
            className={twMerge(
                "flex w-full flex-row justify-between gap-x-1 px-[8%] md:px-8",
                className
            )}
        >
            <span className="flex h-full grow flex-row items-center gap-x-[8%]">
                <Icon className="h-8 w-8 shrink-0 transition-transform group-hover:rotate-6 xs:h-10 xs:w-10" />
                <H5 className="truncate text-[20px] font-bold text-off-white">
                    <ExternalLinkOverlay href={link} aria-label={`open ${name}'s website`}>
                        {name}
                    </ExternalLinkOverlay>
                </H5>
            </span>
            <span className="hidden h-full flex-row items-start gap-x-2 xxs:flex">
                <ExternalLink isHoverable href={link} aria-label={`open ${name}'s website`}>
                    <ExternalLinkIcon className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
                </ExternalLink>
            </span>
        </Card>
    );
}
