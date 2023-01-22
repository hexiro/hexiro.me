import { ButtonLink, Heading, Paragraph } from "@/components/ui";
import Page from "@/layout/Page";

export default function NotFound() {
    return (
        <Page name="404" description="404 | Not Found" x="center" y="center">
            <Heading as="h1" css={{ fontSize: 96 }}>
                404
            </Heading>
            <Paragraph align="center">Oops? This page couldn&apos;t be found!</Paragraph>
            <ButtonLink priority="secondary" href="/" css={{ marginTop: "2em" }}>
                Go Home
            </ButtonLink>
        </Page>
    );
}
