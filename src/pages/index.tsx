import { ROUTES_META } from "@/commons/config";

import { HorizontalDividerWithText } from "@/components/layout/Divider";
import { H1, H2, H3 } from "@/components/ui/Headings";

import { DiscordCard } from "@/components/cards/DiscordCard";
import { RouteCard } from "@/components/cards/RouteCard";

export default function HomePage() {
    return (
        <div className="xl:pr-[10%]">
            <H2 className="font-mono text-off-white">Hi... I&apos;m,</H2>
            <H1>
                Nathan <span className="text-off-white">Lodge</span>
            </H1>
            <H3 className="text-subtitle">A self-taught Software Engineer.</H3>
            <DiscordCard className="mt-8" />
            <HorizontalDividerWithText text="View More" className="mb-16 mt-20" />
            <div className="grid grid-flow-row gap-6 lg:grid-cols-2">
                {ROUTES_META.map((route) => (
                    <RouteCard key={route.name} {...route} />
                ))}
            </div>
        </div>
    );
}
