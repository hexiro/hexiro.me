import { SOCIALS } from "@/commons/sections";

import Social from "components/nav/Social";
import { AnchorList } from "components/ui";

export default function Socials() {
    return (
        <AnchorList>
            {SOCIALS.map((props) => (
                <Social key={props.name} {...props} />
            ))}
        </AnchorList>
    );
}
