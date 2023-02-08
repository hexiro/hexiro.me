/* eslint-disable react/require-default-props */
import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";
import { forwardRef } from "react";

import { slideFromLeft, staggerChildren } from "@/commons/framer";

import { Heading, Paragraph, Subheading } from "@/components/ui";

import useNavSectionIsSelected from "@/hooks/useNavSectionIsSelected";
import useViewportAnimation from "@/hooks/useViewportAnimation";
import type { SEOProps } from "@/layout/SEO";
import { SEO } from "@/layout/SEO";

import { motion } from "framer-motion";

export type SectionProps = PropsWithChildren<ComponentProps<typeof SectionContainer>> &
    IndexProps &
    TextProps;

type IndexProps = {
    index: number | null;
};

type TextProps = {
    name: string;
    nameElement?: () => JSX.Element;
    description: string;
    descriptionElement?: () => JSX.Element;
    subheading?: string;
    subheadingElement?: () => JSX.Element;
};

type SectionSEOProps = SEOProps & IndexProps;

const Section = forwardRef<HTMLElement, SectionProps>(
    (
        {
            name,
            description,
            subheading,
            nameElement = null,
            descriptionElement = null,
            subheadingElement = null,
            index,
            children,
            ...props
        },
        ref
    ) => {
        const controls = useViewportAnimation(ref);

        return (
            <>
                <SectionContainer
                    ref={ref}
                    variants={staggerChildren}
                    initial="initial"
                    animate={controls}
                    exit="initial"
                    {...props}
                >
                    <SectionIdElement id={name.toLowerCase()} />
                    {subheading ? (
                        <motion.div variants={slideFromLeft}>
                            {subheadingElement ? (
                                subheadingElement()
                            ) : (
                                <Subheading>{subheading}</Subheading>
                            )}
                        </motion.div>
                    ) : null}

                    <motion.div variants={slideFromLeft}>
                        {nameElement ? nameElement() : <Heading as="h1">{name}</Heading>}
                    </motion.div>
                    <motion.div variants={slideFromLeft}>
                        {descriptionElement ? (
                            descriptionElement()
                        ) : (
                            <Paragraph size="lg">{description}</Paragraph>
                        )}
                    </motion.div>
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
