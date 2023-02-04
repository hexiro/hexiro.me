import { styled } from "@/theme";

import { forwardRef, memo } from "react";

import { Heading, Paragraph, Span, Subheading } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Page from "@/layout/Page";

const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

const Home = forwardRef<HTMLElement>((_, ref) => {
    console.log("Home");
    return (
        <Page ref={ref} name="Home" description={DESCRIPTION} dir="col" css={{ gap: "$6" }}>
            <Text>
                <Subheading>{"hi! I'm"}</Subheading>
                <Heading as="h1">
                    Nathan <Span color="brand-accent">Lodge</Span>
                    <Span color="text-primary">,</Span>
                </Heading>
                <Paragraph size="lg">
                    an inspired programmer interested in problem-solving, modern technology, and
                    open source while aiming to build beautiful and efficient software.
                </Paragraph>
            </Text>
            <DiscordPresence />
        </Page>
    );
});

export default memo(Home);

const Text = styled("div", {
    display: "flex",
    flexDirection: "column",
});
