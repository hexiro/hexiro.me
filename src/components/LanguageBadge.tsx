import { Badge, Box, HStack } from "@chakra-ui/react";

import Language from "components/repository/language";

interface LanguageBadgeProps {
    name: string;
}

export default function LanguageBadge({ name }: LanguageBadgeProps) {
    return (
        <Badge
            variant="subtle"
            color="brand.text"
            background="blackAlpha.300"
            paddingX={1.5}
            fontSize="0.825rem"
            borderRadius="md"
        >
            <HStack spacing={1} align="center" height="100%">
                <Language name={name} />
                <Box as="span">{name}</Box>
            </HStack>
        </Badge>
    );
}
