import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { Flex } from "@/components/ui";

import type { SEOProps } from "@/layout/SEO";
import SEO from "@/layout/SEO";

type PageProps = SEOProps & ComponentProps<typeof Section>;

const Page = forwardRef<HTMLElement, PropsWithChildren<PageProps>>(
    ({ name, description, children, ...props }, ref) => (
        <>
            <SEO name={name} description={description} />
            <Section ref={ref} as="section" {...props}>
                <SectionIdElement id={name.toLowerCase()} />
                {children}
            </Section>
        </>
    )
);

export default Page;

const Section = styled(Flex, {
    position: "relative",
    flexGrow: 1,
    height: "100%",
    paddingTop: 64,
    paddingBottom: 100,
    paddingX: "$main-x-padding",

    "&:first-of-type": {
        paddingTop: 264,
    },
});

const SectionIdElement = styled("div", {
    position: "absolute",
    top: -124,
    left: 0,
});
