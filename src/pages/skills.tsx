import { SKILLS } from "@/commons/config";

import { Card } from "@/components/ui/Cards";
import { H1, H3, H4 } from "@/components/ui/Headings";

export default function SkillsPage() {
    return (
        <>
            <div className="mb-12">
                <H1>Skills</H1>
                <H3 className="text-subtitle">My skills with various technology.</H3>
            </div>
            <ul className="flex flex-col gap-y-12">
                {Object.entries(SKILLS).map(([name, values]) => (
                    <li key={name}>
                        <H4 mono className="text-text">
                            {name}
                        </H4>
                        <ul className="flex flex-row flex-wrap gap-x-6 gap-y-4">
                            {values.map(({ name, icon: Icon }) => (
                                <Card
                                    key={name}
                                    as="li"
                                    className="flex flex-row items-center gap-x-2 min-w-[375px]"
                                >
                                    <Icon className="w-8 h-8" />
                                    <span className="text-text text-[20px]">{name}</span>
                                </Card>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
}
