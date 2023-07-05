import type { IRouteMeta } from "@/commons/config";

import { LinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface IRouteCardProps extends IRouteMeta {
    className?: string;
}

export function RouteCard({ name, path, description, icon: Icon, className }: IRouteCardProps) {
    return (
        <Card isHoverable className={twMerge("w-full lg:w-[calc(50%-1rem)]", className)}>
            <div className="flex flex-col gap-y-1 mb-3">
                <Icon className="w-7 h-7" />
                <LinkOverlay
                    className="font-sans text-off-white font-extrabold text-[28px] leading-none"
                    href={path}
                >
                    {name}
                </LinkOverlay>
            </div>
            <p className="min-h-[48px]">{description}</p>
        </Card>
    );
}
