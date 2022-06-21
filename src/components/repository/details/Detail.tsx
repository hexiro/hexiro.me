import type { PropsWithChildren } from "react";

import { Heading, HStack, Text } from "@chakra-ui/react";

type DetailProps = PropsWithChildren<{ count: number }>;

export default function Detail({ count, children }: DetailProps): JSX.Element | null {
    if (count <= 0) return null;
    let detail: string | number;
    if (count >= 1000 && count < 10000) {
        // format. ex. (4990 > '4.9k')
        detail = `${Math.floor((count / 1000) * 10) / 10}k`;
    } else {
        detail = count;
    }

    return (
        <HStack display="inline-flex" align="center" spacing={0.5}>
            {children}
            <Text as="h4">{detail}</Text>
        </HStack>
    );
}
