import type { IRouteMeta } from "@/commons/config";

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
        <Card className={twMerge("w-[calc(50%-1rem)]", className)}>
            <Icon className="w-7 h-7" />
            <h4>{name}</h4>
            <p>{description}</p>
        </Card>
    );
}
