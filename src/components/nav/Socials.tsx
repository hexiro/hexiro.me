import { SOCIALS } from "@/commons/secitions";

import { AnchorList } from "components/ui";
import Social from "components/nav/Social";

export default function Socials() {
    return (
        <AnchorList>
            {SOCIALS.map((props) => (
                <Social key={props.name} {...props} />
            ))}
        </AnchorList>
    );
}
