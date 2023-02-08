import { styled } from "@/theme";

import { Button, ButtonLink, Heading, Link, Paragraph } from "@/components/ui";

import Page from "@/layout/Page";

const NAME = "404";
const DESCRIPTION = "404 | Not Found";

export default function NotFound() {
    return (
        <Page name={NAME} description={DESCRIPTION} css={{ paddingTop: 240 }}>
            {/* <Heading as="h1" css={{ fontSize: 96 }}>
                404
            </Heading>
            <Paragraph size="lg">{"Oops? This page couldn't be found!"}</Paragraph> */}
            <ButtonLink priority="secondary" href="/" css={{ marginTop: "2em" }}>
                Go Home
            </ButtonLink>
        </Page>
    );
}

// const ButtonLinkWrapper = styled(Button, {
//     color: "inherit",
//     textDecoration: "inherit",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
// });
