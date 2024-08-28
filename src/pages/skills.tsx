import { SKILLS } from "@/commons/config";

import { H1, H2, H3 } from "@/components/ui/Headings";

import SkillCard from "@/components/cards/SkillCard";

import { Seo } from "@/layout/Seo";

const NAME = "Skills";
const DESCRIPTION = "My skills with modern technology.";

export default function SkillsPage() {
    return (
        <>
            <Seo name={NAME} description={DESCRIPTION} />
            <div className="mb-12">
                <H1>{NAME}</H1>
                <H2 className="text-subtitle">{DESCRIPTION}</H2>
            </div>
            <ul className="flex flex-col gap-y-12">
                {Object.entries(SKILLS).map(([name, values]) => (
                    <li key={name}>
                        <div className="mb-2">
                            <H3 mono className="text-text">
                                {name}
                            </H3>
                        </div>
                        <ul className="grid auto-cols-fr gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                            {values.map((skill) => (
                                <SkillCard key={skill.name} skill={skill} />
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
}
