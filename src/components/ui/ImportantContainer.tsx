import { styled } from "@/theme";

import { motion } from "framer-motion";

const ImportantContainer = styled(motion.div, {
    position: "relative",
    backgroundColor: "$background-secondary",
    borderRadius: "$xl",
    border: "2px solid $lighten-10",
    boxShadow: "$md",
    display: "flex",
    flexDirection: "row",
    paddingX: "20px",
    paddingY: "16px",
});

export default ImportantContainer;
