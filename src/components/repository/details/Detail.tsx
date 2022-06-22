import { HStack, Icon, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface DetailProps {
    count: number;
    icon: IconType;
}

export default function Detail({ count, icon }: DetailProps): JSX.Element | null {
    if (count <= 0) return null;
    let detail: string | number;
    if (count >= 1000 && count < 10000) {
        // format. ex. (4990 > '4.9k')
        detail = `${Math.floor((count / 1000) * 10) / 10}k`;
    } else {
        detail = count;
    }

    return (
        <HStack display="inline-flex" align="center" spacing={0.5} whiteSpace="nowrap">
            <Icon as={icon} color="brand.primary" />
            <Text as="h4">{detail}</Text>
        </HStack>
    );
}
