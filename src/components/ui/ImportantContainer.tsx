import { styled } from "@/theme";

import { motion } from "framer-motion";

const ImportantContainer = styled(motion.div, {
    position: "relative",
    backgroundColor: "$background-secondary",
    borderRadius: "$xl",
    border: "2px solid $lighten-10",
    boxShadow: "$md",
    padding: "$4",
    display: "flex",
    flexDirection: "row",
});

export default ImportantContainer;
