import { styled } from "@/theme";

import { slideFromBottom } from "@/commons/animations";

import { ButtonLink } from "@/components/ui";

import Page, { PageDescription, PageHeading, PageText } from "@/layout/Page";

import { motion } from "framer-motion";

const NAME = "404";
const DESCRIPTION = "404 | Not Found";

export default function NotFound() {
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <PageText>
                <PageHeading>{NAME}</PageHeading>
                <PageDescription>{DESCRIPTION}</PageDescription>
                <HomeButtonContainer variants={slideFromBottom}>
                    <ButtonLink href="/" size="lg">
                        Go Home
                    </ButtonLink>
                </HomeButtonContainer>
            </PageText>
        </Page>
    );
}

const HomeButtonContainer = styled(motion.div, {
    marginTop: "$5",
});
