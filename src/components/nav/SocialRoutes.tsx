import { SOCIAL_ROUTES } from "@/commons/routes";

import SocialRoute from "@/components/nav/SocialRoute";

import { AnchorList } from "components/ui";

export default function SocialRoutes() {
    return (
        <AnchorList>
            {SOCIAL_ROUTES.map((props) => (
                <SocialRoute key={props.name} {...props} />
            ))}
        </AnchorList>
    );
}
