import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { Flex } from "@/components/ui";

import type { SEOProps } from "@/layout/SEO";
import { SEO } from "@/layout/SEO";

export type SectionProps = ComponentProps<typeof SectionContainer> &
    SEOProps &
    SectionSelectedProps;

export type SectionSelectedProps = {
    isSelected: boolean;
};

const Section = forwardRef<HTMLElement, PropsWithChildren<SectionProps>>(
    ({ name, description, children, isSelected, ...props }, ref) => (
        <>
            {isSelected && <SEO name={name} description={description} />}
            <SectionContainer ref={ref} as="section" {...props}>
                <SectionIdElement id={name.toLowerCase()} />
                {children}
            </SectionContainer>
        </>
    )
);

export default Section;

const SectionContainer = styled(Flex, {
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
