import { SOCIAL_ROUTES } from "@/commons/routes";

import { AnchorList } from "@/components/ui";

import SocialRoute from "@/components/nav/SocialRoute";

export default function SocialRoutes() {
    return (
        <AnchorList>
            {SOCIAL_ROUTES.map((props) => (
                <SocialRoute key={props.name} {...props} />
            ))}
        </AnchorList>
    );
}
