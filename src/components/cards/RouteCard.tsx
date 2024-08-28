import type { IRouteMeta } from "@/commons/config";

import { LinkOverlay } from "@/components/layout/Overlay";
import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface RouteCardProps extends IRouteMeta {
    readonly className?: string;
}

export function RouteCard({ name, path, description, icon: Icon, className }: RouteCardProps) {
    return (
        <Card isHoverable isFocusable as="li" className={twMerge("group w-full", className)}>
            <div className="mb-3 flex flex-col gap-y-1">
                <Icon className="h-8 w-8 transition-transform group-hover:rotate-6" />
                <LinkOverlay
                    href={path}
                    className="font-sans text-[28px] font-extrabold leading-none text-off-white"
                    aria-label="open local route"
                >
                    {name}
                </LinkOverlay>
            </div>
            <p className="text-pretty after:inline-block group-hover:after:animate-ellipsis lg:min-h-[48px]">
                {description}
            </p>
        </Card>
    );
}
