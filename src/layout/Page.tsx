import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";

import { Flex } from "@/components/ui";
import type { SEOProps } from "@/layout/SEO";
import SEO from "@/layout/SEO";

type PageProps = SEOProps & ComponentProps<typeof Main>;

export default function Page({
    name,
    description,
    children,
    ...props
}: PropsWithChildren<PageProps>) {
    return (
        <>
            <SEO name={name} description={description} />
            <Main as="main" {...props}>
                {children}
            </Main>
        </>
    );
}

const Main = styled(Flex, {
    flexGrow: 1,
    height: "100%",
    paddingY: "$main-y-padding",
    paddingX: "$main-x-padding",
});
