import { SOCIAL_ROUTES } from "@/commons/routes";

import Social from "components/nav/Social";
import { AnchorList } from "components/ui";

export default function Socials() {
    return (
        <AnchorList>
            {SOCIAL_ROUTES.map((props) => (
                <Social key={props.name} {...props} />
            ))}
        </AnchorList>
    );
}
