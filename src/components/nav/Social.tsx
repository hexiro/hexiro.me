import type { SocialRoute } from "@/commons/routes";

import { Link, Tooltip } from "@/components/ui";

export default function Social({ name, href, icon }: SocialRoute) {
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
