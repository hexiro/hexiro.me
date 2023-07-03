import { ROUTES_META } from "@/commons/config";

import { HorizontalDividerWithText } from "@/components/layout/Divider";

import DiscordCard from "@/components/home/DiscordCard";
import RouteCard from "@/components/home/RouteCard";

export default function HomePage() {
    return (
        <div className="pr-[10%]">
            <h2 className="font-mono text-off-white">Hi... I&apos;m,</h2>
            <h1>
                NATHAN <span className="text-off-white">LODGE</span>
            </h1>
            <h3 className="text-subtitle">A self-taught Software Engineer.</h3>
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
