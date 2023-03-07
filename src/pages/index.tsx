import { Span } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Page, { PageDescription, PageHeading, PageSubheading, PageText } from "@/layout/Page";

const NAME = "Home";
const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

export default function HomePage() {
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <PageText>
                <PageSubheading>{"hi! I'm"}</PageSubheading>
                <PageHeading>
                    Nathan <Span color="brand-accent">Lodge</Span>
                    <Span color="text-primary">,</Span>
                </PageHeading>
                <PageDescription>{DESCRIPTION}</PageDescription>
            </PageText>
            <DiscordPresence />
        </Page>
    );
}
