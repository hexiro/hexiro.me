// based on link overlay from chakra-ui
// https://chakra-ui.com/docs/components/link-overlay
import { styled } from "@/theme";

import Link from "components/ui/Link";

const LinkOverlay = styled(Link, {
    "&::before": {
        content: "''",
        cursor: "inherit",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: "100%",
    },
});

export default LinkOverlay;
