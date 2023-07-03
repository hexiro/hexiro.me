import type { IRouteMeta } from "@/commons/config";

import { LinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";

import { twMerge } from "tailwind-merge";

interface IRouteCardProps extends IRouteMeta {
    className?: string;
}

export default function RouteCard({
    name,
    path,
    description,
    icon: Icon,
    className,
}: IRouteCardProps) {
    return (
        <Card isHoverable className={twMerge("w-[calc(50%-1rem)]", className)}>
            <Icon className="w-7 h-7" />
            <LinkOverlay
                className="font-sans text-off-white font-extrabold text-[28px]"
                href={path}
            >
                {name}
            </LinkOverlay>
            <p className="min-h-[48px]">{description}</p>
        </Card>
    );
}
