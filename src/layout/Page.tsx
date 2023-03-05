import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { PropsWithChildren } from "react";

import { pageAnimationOverAtom } from "@/commons/atoms";
import { slideFromLeft, staggerChildren } from "@/commons/framer";

import { Subheading, Heading, Paragraph } from "@/components/ui";

import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { SEO } from "layout/SEO";

type PageProps = PropsWithChildren<ComponentProps<typeof PageContainer>> & {
    name: string;
    description: string;
    subheading?: string;
    nameElement?: () => JSX.Element;
    descriptionElement?: () => JSX.Element;
    subheadingElement?: () => JSX.Element;
};

export default function Page({
    name,
    description,
    subheading,
    nameElement,
    descriptionElement,
    subheadingElement,
    children,
    ...props
}: PageProps) {
    const setPageAnimationOver = useSetAtom(pageAnimationOverAtom);

    return (
        <>
            <PageContainer
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                exit="initial"
                onAnimationStart={() => setPageAnimationOver(false)}
                onAnimationComplete={() => setPageAnimationOver(true)}
                {...props}
            >
                <TextWrapper>
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
                </TextWrapper>
                {children}
            </PageContainer>
            <SEO name={name} description={description} />
        </>
    );
}

const PageContainer = styled(motion.main, {
    position: "relative",
    flexGrow: 1,
    height: "100%",
    minHeight: "100vh",
    paddingTop: 225,
    paddingBottom: 100,
    paddingX: "$main-x-padding",

    "@lg": {
        paddingX: "$main-x-padding-lg",
    },
});

const TextWrapper = styled("div", {
    paddingBottom: "$7",
});
