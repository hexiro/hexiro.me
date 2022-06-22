import type { PropsWithChildren } from "react";

import type { FlexProps } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";

export default function RepositoryContainer({ children, ...rest }: PropsWithChildren<FlexProps>) {
    return (
        <SimpleGrid
            className="repositories-container"
            wrap="wrap"
            // justify={{ base: "center", xl: "revert" }}
            minChildWidth={{ base: "200px", sm: "300px", md: "400px" }}
            spacing={5}
            {...rest}
        >
            {children}
        </SimpleGrid>
    );
}
