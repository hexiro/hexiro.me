import { Link, Tooltip } from "@/components/ui";

import type { NavRoute } from "@/layout/Nav";

export default function Social({ name, href, icon }: NavRoute) {
    return (
        <li>
            <Tooltip
                animation="shift"
                title={name}
                style={{ display: "block" }}
                position="bottom"
                distance={5}
            >
                <Link newTab href={href} animation="pop" lineHeight="single">
                    {icon()}
                </Link>
            </Tooltip>
        </li>
    );
}
