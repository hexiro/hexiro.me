import { AGE, ROUTES_META } from "@/commons/config";

import { HorizontalDividerWithText } from "@/components/layout/Divider";
import { H1, H2, H3 } from "@/components/ui/Headings";

import { DiscordCard } from "@/components/cards/DiscordCard";
import { RouteCard } from "@/components/cards/RouteCard";

import { Seo } from "@/layout/Seo";

const NAME = "Home";
const DESCRIPTION = `an ${AGE} year old Software Engineer.`;
// prettier-ignore
const FULL_DESCRIPTION = `Hi, I'm Nathan Lodge, ${DESCRIPTION}`;

export default function HomePage() {
    return (
        <>
            <Seo name={NAME} description={FULL_DESCRIPTION} />
            <div className="xl:pr-[10%]">
                <H2 className="font-mono text-off-white">
                    <span className="after:w-[3ch] after:inline-block after:animate-full-ellipsis after:ease-linear after:content-['...'] after:animation-delay-[2s]">
                        Hi
                    </span>{" "}
                    I&apos;m,
                </H2>
                <H1 className="tracking-wide">
                    Nathan <span className="text-off-white">Lodge</span>
                </H1>
                <H3 className="text-subtitle">{DESCRIPTION}</H3>
                <DiscordCard className="mt-8" />
                <HorizontalDividerWithText text="View More" className="mb-16 mt-20" />
                <div className="grid grid-flow-row gap-6 lg:grid-cols-2">
                    {ROUTES_META.map((route) => (
                        <RouteCard key={route.name} {...route} />
                    ))}
                </div>
            </div>
        </>
    );
}
