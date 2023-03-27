import { styled } from "@/theme";

import { motion } from "framer-motion";

const ButtonsContainer = styled(motion.div, {
    display: "flex",
    alignItems: "center",
    marginTop: "$5",
    gap: "$3",

    flexDirection: "column",

    "> div, > div > a": {
        width: "100%",
    },

    "@xs": {
        flexDirection: "row",
        "> div, > div > a": {
            width: "auto",
        },
    },
});

export default ButtonsContainer;
