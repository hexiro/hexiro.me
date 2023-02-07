import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { staggerChildren, slideFromLeft } from "@/commons/framer";

import { Heading, Paragraph, Span, Subheading } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Section from "@/layout/Section";

import { motion } from "framer-motion";

const NAME = "Home";
const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";
const INDEX = 0;

const Home = forwardRef<HTMLElement>((_, ref) => (
    <Section ref={ref} name={NAME} description={DESCRIPTION} index={INDEX}>
        <TextContainer variants={staggerChildren}>
            <motion.div variants={slideFromLeft}>
                <Subheading>{"hi! I'm"}</Subheading>
            </motion.div>
            <motion.div variants={slideFromLeft}>
                <Heading as="h1">
                    Nathan <Span color="brand-accent">Lodge</Span>
                    <Span color="text-primary">,</Span>
                </Heading>
            </motion.div>
            <motion.div variants={slideFromLeft}>
                <Paragraph size="lg">{DESCRIPTION}</Paragraph>
            </motion.div>
        </TextContainer>
        <DiscordPresence />
    </Section>
));

export default memo(Home);

const TextContainer = styled(motion.div, {
    display: "flex",
    flexDirection: "column",
    marginBottom: "$6",
});
