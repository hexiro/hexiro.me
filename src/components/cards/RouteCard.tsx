import type { IRouteMeta } from "@/commons/config";

import { LinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface IRouteCardProps extends IRouteMeta {
    readonly className?: string;
}

export function RouteCard({ name, path, description, icon: Icon, className }: IRouteCardProps) {
    return (
        <Card isHoverable isFocusable className={twMerge("group w-full", className)}>
            <div className="mb-3 flex flex-col gap-y-1">
                <Icon className="h-8 w-8 transition-transform group-hover:rotate-6" />
                <LinkOverlay
                    className="font-sans text-[28px] font-extrabold leading-none text-off-white"
                    href={path}
                >
                    {name}
                </LinkOverlay>
            </div>
            <p className="after:inline-block group-hover:after:animate-ellipsis lg:min-h-[48px]">
                {description}
            </p>
        </Card>
    );
}
