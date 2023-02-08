import { forwardRef, memo } from "react";

import { Heading, Span } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Section from "@/layout/Section";

const NAME = "Home";
const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";
const INDEX = 0;

const Home = forwardRef<HTMLElement>((_, ref) => (
    <Section
        ref={ref}
        index={INDEX}
        subheading="hi! I'm"
        name={NAME}
        description={DESCRIPTION}
        nameElement={() => (
            <Heading as="h1">
                Nathan <Span color="brand-accent">Lodge</Span>
                <Span color="text-primary">,</Span>
            </Heading>
        )}
    >
        <DiscordPresence />
    </Section>
));

export default memo(Home);
