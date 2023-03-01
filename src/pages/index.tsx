import { Heading, Span } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Page from "@/layout/Page";

const NAME = "Home";
const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

export default function HomePage() {
    return (
        <Page
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
        </Page>
    );
}
