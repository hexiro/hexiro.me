import { ROUTES_META } from "@/commons/config";

import { HorizontalDividerWithText } from "@/components/layout/Divider";
import { H1, H2, H3 } from "@/components/ui/Headings";

import DiscordCard from "@/components/home/DiscordCard";
import RouteCard from "@/components/home/RouteCard";

export default function HomePage() {
    return (
        <div className="pr-[10%]">
            <H2 className="font-mono text-off-white">Hi... I&apos;m,</H2>
            <H1>
                Nathan <span className="text-off-white">Lodge</span>
            </H1>
            <H3 className="text-subtitle">A self-taught Software Engineer.</H3>
            <DiscordCard className="mt-8" />
            <div>
                <HorizontalDividerWithText text="View More" className="mt-20 mb-16" />
                <div className="flex flex-row flex-wrap gap-8">
                    {ROUTES_META.map((route) => (
                        <RouteCard key={route.name} {...route} />
                    ))}
                </div>
            </div>
        </div>
    );
}
