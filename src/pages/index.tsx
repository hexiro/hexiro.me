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
            <div className="w-full md:w-3/4 lg:w-full">
                <HorizontalDividerWithText text="View More" className="mt-20 mb-16" />
                <div className="flex gap-8 flex-col lg:flex-row lg:flex-wrap">
                    {ROUTES_META.map((route) => (
                        <RouteCard key={route.name} {...route} />
                    ))}
                </div>
            </div>
        </div>
    );
}
