import { Link } from "@/components/ui";
import type { NavRoute } from "@/layout/Nav";

import { Tooltip } from "react-tippy";

export default function Social({ name, href, icon }: NavRoute) {
    return (
        <li>
            <Tooltip
                arrow
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
