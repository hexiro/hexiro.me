import { currentAge, ROUTES_META } from "@/commons/config";

import { HorizontalDividerWithText } from "@/components/layout/Divider";
import { H1, H2 } from "@/components/ui/Headings";

import { DiscordCard } from "@/components/cards/DiscordCard";
import { RouteCard } from "@/components/cards/RouteCard";

import { Seo } from "@/layout/Seo";

const NAME = "Home";
const DESCRIPTION = `a ${currentAge()} year old Software Engineer.`;
const FULL_DESCRIPTION = `Hi, I'm Nathan Lodge, ${DESCRIPTION}`;

export default function HomePage() {
    return (
        <>
            <Seo name={NAME} description={FULL_DESCRIPTION} />
            <div>
                <span className="font-mono text-xl font-black uppercase text-off-white sm:text-2xl lg:text-3xl">
                    <span className="after:inline-block after:w-[3ch] after:animate-full-ellipsis after:ease-linear after:content-['...'] after:animation-delay-[2s]">
                        Hi
                    </span>{" "}
                    I&apos;m,
                </span>
                <H1 className="tracking-wide">
                    Nathan <span className="text-off-white">Lodge</span>
                </H1>
                <H2 className="text-subtitle">{DESCRIPTION}</H2>
                <DiscordCard className="mt-8" />
                <HorizontalDividerWithText text="View More" className="mb-16 mt-20" />
                <ul className="grid grid-flow-row gap-6 lg:grid-cols-2">
                    {ROUTES_META.map((route) => (
                        <RouteCard key={route.name} {...route} />
                    ))}
                </ul>
            </div>
        </>
    );
}
