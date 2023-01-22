import { Heading } from "@/components/ui";
import Paragraph from "@/components/ui/Paragraph";
import Page from "@/layout/Page";

export default function NotFound() {
    return (
        <Page
            name="404"
            description="404 | Not Found"
            x="center"
            y="center"
        >
            <Heading as="h1" css={{ fontSize: 96 }}>
                404
            </Heading>
            <Paragraph align="center">Oops? This page couldn&apos;t be found!</Paragraph>
        </Page>
    );
}
