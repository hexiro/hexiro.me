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
            borderRadius: "md",
            backgroundColor: "background.tertiary",
            textColor: "brand.text",
            paddingY: 1,
            paddingX: 2,
            fontWeight: 400,
            border: "1px solid",
            borderColor: "whiteAlpha.300",
        },
        defaultProps: {
            placement: "top",
        },
    },
};

export default components;
