import { SKILLS } from "@/commons/config";

import { H1, H3, H4 } from "@/components/ui/Headings";

import SkillCard from "@/components/cards/SkillCard";

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
                        <div className="mb-2">
                            <H4 mono className="text-text">
                                {name}
                            </H4>
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
