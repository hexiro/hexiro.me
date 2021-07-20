import React from "react";
import { motion } from "framer-motion";

export interface FadeInProps {
    children: React.ReactNode;
    duration?: number;
    delay?: number;
}

export const FadeIn = ({ children, duration, delay }: FadeInProps): JSX.Element => {
    if (!duration) duration = 0.5
    if (!delay) delay = 0
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay }}
            style={{ display: "inherit" }}
        >
            {children}
        </motion.div>
    );
};
