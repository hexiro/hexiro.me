import type { ISkill } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";
import { ExternalLinkIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";

import { twMerge } from "tailwind-merge";

interface ISocialCardProps {
    skill: ISkill;
    className?: string;
}

export default function SkillCard({ skill, className }: ISocialCardProps) {
    const { icon: Icon, name, link } = skill;

    return (
        <Card
            isHoverable
            as="li"
            className={twMerge("flex w-full flex-row items-center gap-x-6 px-6 md:px-8", className)}
        >
            <Icon className="h-10 w-10 shrink-0" />
            <H5 className="text-[20px] font-bold text-off-white">
                <ExternalLinkOverlay href={link}>{name}</ExternalLinkOverlay>
            </H5>
            <div className="absolute right-8 top-6 hidden flex-row gap-x-2 xxs:flex">
                <ExternalLink href={link} className="transition-transform hover:translate-y-[-2px]">
                    <ExternalLinkIcon />
                </ExternalLink>
            </div>
        </Card>
    );
}
