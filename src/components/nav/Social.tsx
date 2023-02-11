import type { Social } from "@/commons/sections";

import { Link, Tooltip } from "@/components/ui";

export default function Social({ name, href, icon }: Social) {
    return (
        <li>
            <Tooltip title={name} size="sm" animation="shift" position="bottom" distance={5}>
                <Link
                    newTab
                    href={href}
                    aria-label={`${name} social network icon`}
                    animation="pop"
                    lineHeight="single"
                >
                    {icon()}
                </Link>
            </Tooltip>
        </li>
    );
}
