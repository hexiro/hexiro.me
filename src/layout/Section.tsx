import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren, RefObject } from "react";
import { forwardRef } from "react";

import { topLevelStaggerChildren } from "@/commons/framer";

import useNavSectionIsSelected from "@/hooks/useNavSectionIsSelected";
import useViewportAnimation from "@/hooks/useViewportAnimation";
import type { SEOProps } from "@/layout/SEO";
import { SEO } from "@/layout/SEO";

import { motion } from "framer-motion";

export type SectionProps = PropsWithChildren<
    ComponentProps<typeof SectionContainer> & SectionSEOProps
>;

type SectionSEOProps = SEOProps & {
    index: number | null;
};

const Section = forwardRef<HTMLElement, SectionProps>(
    ({ name, description, index, children, ...props }, ref) => {
        const controls = useViewportAnimation(ref as RefObject<HTMLElement>);
        return (
            <>
                <SectionContainer
                    ref={ref}
                    variants={topLevelStaggerChildren}
                    initial="initial"
                    animate={controls}
                    exit="initial"
                    {...props}
                >
                    <SectionIdElement id={name.toLowerCase()} />
                    {children}
                </SectionContainer>
                <SectionSEO name={name} description={description} index={index} />
            </>
        );
    }
);

const SectionSEO = ({ name, description, index }: SectionSEOProps) => {
    const isSelected = useNavSectionIsSelected(index);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (!isSelected || index === null) return <></>;

    return <SEO name={name} description={description} />;
};

export default Section;

const SectionContainer = styled(motion.section, {
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
    top: "-$sizes$nav-height",
    left: 0,
});
