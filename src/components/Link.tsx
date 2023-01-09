import { styled } from "theme";

import NextLink from "next/link";

const Link = styled(NextLink, {
    color: "inherit",
    textDecoration: "inherit",
    // willChange: "transform",
    // transition: "transform 0.2s ease-in-out",

    // "&:hover": {
    //     transform: "translateY(-2px)",
    // },
});

export default Link;
