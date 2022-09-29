import { Badge, Box, HStack } from "@chakra-ui/react";

import LanguageIcon from "components/repository/LanguageIcon";

interface LanguageBadgeProps {
    name: string;
}

export default function LanguageBadge({ name }: LanguageBadgeProps) {
    return (
        <Badge
            variant="subtle"
            color="brand.text"
            background="blackAlpha.400"
            borderColor="whiteAlpha.100"
            borderWidth={1}
            paddingX={1.5}
            paddingY={0.5}
            fontSize="0.825rem"
            borderRadius="md"
        >
            <HStack spacing={1} align="center" height="100%">
                <LanguageIcon name={name} />
                <Box as="span">{name}</Box>
            </HStack>
        </Badge>
    );
}
