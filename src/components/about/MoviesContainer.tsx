import { styled } from "@/theme";

import { motion } from "framer-motion";

const MoviesContainer = styled(motion.div, {
    display: "grid",
    gridGap: "$3",
    gridAutoFlow: "column",
    overflowX: "scroll",
    overflowY: "hidden",
    paddingTop: "$3",
    paddingBottom: "$2",
    gridTemplateRows: "auto auto",

    "@xxl": {
        gridTemplateRows: "auto auto auto",
    },
});

export default MoviesContainer;
