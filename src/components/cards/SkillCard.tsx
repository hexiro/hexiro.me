import type { ISkill } from "@/commons/config";

import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";

import { twMerge } from "tailwind-merge";

interface ISocialCardProps {
    skill: ISkill;
    className?: string;
}

export default function SkillCard({ skill, className }: ISocialCardProps) {
    const { icon: Icon, name } = skill;

    return (
        <Card
            as="li"
            className={twMerge("flex w-full flex-row items-center gap-x-6 px-6 md:px-8", className)}
        >
            <Icon className="h-10 w-10 shrink-0" />
            <H5 className="text-[20px] font-bold text-off-white">{name}</H5>
        </Card>
    );
}
