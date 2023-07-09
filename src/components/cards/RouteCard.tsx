import type { IRouteMeta } from "@/commons/config";

import { LinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface IRouteCardProps extends IRouteMeta {
    className?: string;
}

export function RouteCard({ name, path, description, icon: Icon, className }: IRouteCardProps) {
    return (
        <Card isHoverable className={twMerge("group w-full", className)}>
            <div className="mb-3 flex flex-col gap-y-1">
                <Icon className="h-7 w-7" />
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
