import { Link } from "@/components/ui";
import type { NavRoute } from "@/layout/Nav";

import { Tooltip } from "react-tippy";

export default function Social({ name, href, icon }: NavRoute) {
    return (
        <li>
            <Tooltip arrow title={name} style={{ display: "block" }} position="bottom">
                <Link newTab href={href} animation="pop" lineHeight="single">
                    {icon()}
                </Link>
            </Tooltip>
        </li>
    );
}
