import type { FlexProps } from "@chakra-ui/react";
import { Flex, forwardRef } from "@chakra-ui/react";

export default forwardRef<FlexProps, typeof Flex>(({ children, ...rest }, ref) => (
    <Flex
        ref={ref}
        as="section"
        position="relative"
        width="100%"
        direction="column"
        justify={{ base: "center", xl: "revert" }}
        {...rest}
    >
        {children}
    </Flex>
));
