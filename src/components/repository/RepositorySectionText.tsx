import type { BoxProps } from "@chakra-ui/react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface RepositorySectionTextProps extends BoxProps {
    title: string;
    description: string;
}

export default function RepositorySectionText({
    title,
    description,
    ...rest
}: RepositorySectionTextProps) {
    return (
        <Box
            textAlign={{ base: "center", lg: "left" }}
            {...rest}
            maxWidth="container.md"
            paddingBottom={4}
        >
            <Heading textTransform="capitalize">{title}</Heading>
            <Text>{description}</Text>
        </Box>
    );
}
