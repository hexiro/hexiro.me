import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { Heading, Paragraph, Span, Subheading } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Section from "@/layout/Section";


const NAME = "Home";
const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";
const INDEX = 0;

const Home = forwardRef<HTMLElement>((_, ref) => (
    <Section
        ref={ref}
        name={NAME}
        description={DESCRIPTION}
        index={INDEX}
        dir="col"
        css={{ gap: "$6" }}
    >
        <Text>
            <Subheading>{"hi! I'm"}</Subheading>
            <Heading as="h1">
                Nathan <Span color="brand-accent">Lodge</Span>
                <Span color="text-primary">,</Span>
            </Heading>
            <Paragraph size="lg">{DESCRIPTION}</Paragraph>
        </Text>
        <DiscordPresence />
    </Section>
));

export default memo(Home);

const Text = styled("div", {
    display: "flex",
    flexDirection: "column",
});
