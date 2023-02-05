import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { Flex } from "@/components/ui";

import useNavSectionIsSelected from "@/hooks/useNavSectionIsSelected";
import type { SEOProps } from "@/layout/SEO";
import { SEO } from "@/layout/SEO";

export type SectionProps = ComponentProps<typeof SectionContainer> & SectionSEOProps;

type SectionSEOProps = SEOProps & {
    index: number | null;
};

const Section = forwardRef<HTMLElement, PropsWithChildren<SectionProps>>(
    ({ name, description, index, children, ...props }, ref) => (
        <>
            <SectionContainer ref={ref} as="section" {...props}>
                <SectionIdElement id={name.toLowerCase()} />
                {children}
            </SectionContainer>
            <SectionSEO name={name} description={description} index={index} />
        </>
    )
);

const SectionSEO = ({ name, description, index }: SectionSEOProps) => {
    const isSelected = useNavSectionIsSelected(index);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!isSelected || index === null) return <></>;

    return <SEO name={name} description={description} />;
};

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
