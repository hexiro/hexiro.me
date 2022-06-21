import { PropsWithChildren } from "react";

import { fadeChildren } from "commons/animations";

import { Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function RepositoryContainer({ children, ...rest }: PropsWithChildren<FlexProps>) {
    return (
        <Flex
            className="repositories-container"
            as={motion.div}
            variants={fadeChildren}
            wrap="wrap"
            justify={{ base: "center", xl: "flex-end" }}
            {...rest}
        >
            {children}
        </Flex>
    );
}
