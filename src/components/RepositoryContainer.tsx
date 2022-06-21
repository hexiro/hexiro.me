import { PropsWithChildren } from "react";

import { Flex, FlexProps, SimpleGrid } from "@chakra-ui/react";

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
