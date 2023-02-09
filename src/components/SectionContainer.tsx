import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { forwardRef } from "react";

import { staggerChildren, slideFromLeft } from "@/commons/framer";

import { Subheading, Heading, Paragraph } from "components/ui";
import { motion } from "framer-motion";

export type SectionContainerProps = ComponentProps<typeof SectionContainerWrapper> & {
    name: string;
    description: string;
    subheading?: string;
    nameElement?: () => JSX.Element;
    descriptionElement?: () => JSX.Element;
    subheadingElement?: () => JSX.Element;
};

const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
    (
        {
            name,
            description,
            subheading,
            nameElement,
            descriptionElement,
            subheadingElement,
            children,
            ...props
        },
        ref
    ) => (
        <SectionContainerWrapper
            ref={ref}
            variants={staggerChildren}
            initial="initial"
            animate="animate"
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
        </SectionContainerWrapper>
    )
);

export default SectionContainer;

const SectionContainerWrapper = styled(motion.section, {
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
