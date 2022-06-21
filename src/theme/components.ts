import type { ComponentStyleConfig } from "@chakra-ui/react";

const components: Record<string, ComponentStyleConfig> = {
    Heading: {
        baseStyle: {
            fontWeight: 400,
        },
    },
    Button: {
        baseStyle: {
            fontWeight: 500,
        },
    },
    Tooltip: {
        baseStyle: {
            backgroundColor: "blackAlpha.400",
            textColor: "whiteAlpha.900",
            paddingY: 1,
            paddingX: 2,
            fontWeight: 400,
        },
    },
};

export default components;
