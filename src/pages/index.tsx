import { styled } from "@/theme";

import { slideFromBottom, staggerChildren } from "@/commons/framer";
import { AboutIcon, ProjectsIcon } from "@/commons/icons";

import { ButtonLink, Span } from "@/components/ui";

import DiscordPresence from "@/components/home/DiscordPresence";

import Page, { PageDescription, PageHeading, PageSubheading, PageText } from "@/layout/Page";

import { motion } from "framer-motion";

const NAME = "Home";
const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

export default function HomePage() {
    return (
        <Page name={NAME} description={`hi! i'm Nathan Lodge, ${DESCRIPTION}`}>
            <PageText>
                <PageSubheading>{"hi! i'm"}</PageSubheading>
                <PageHeading>
                    Nathan <Span color="brand-accent">Lodge</Span>
                    <Span color="text-primary">,</Span>
                </PageHeading>
                <PageDescription>{DESCRIPTION}</PageDescription>
                <ButtonsContainer variants={staggerChildren}>
                    <motion.div variants={slideFromBottom}>
                        <ButtonLink icon={AboutIcon} priority="primary" href="/about" size="lg">
                            About Me
                        </ButtonLink>
                    </motion.div>
                    <motion.div variants={slideFromBottom}>
                        <ButtonLink icon={ProjectsIcon} href="/projects" size="lg">
                            View Projects
                        </ButtonLink>
                    </motion.div>
                </ButtonsContainer>
            </PageText>
            <DiscordPresence />
        </Page>
    );
}

const ButtonsContainer = styled(motion.div, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "$5",
    gap: "$3",
});
