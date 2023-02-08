import { ButtonLink } from "@/components/ui";

import Page from "@/layout/Page";

const NAME = "404";
const DESCRIPTION = "404 | Not Found";

export default function NotFound() {
    return (
        <Page name={NAME} description={DESCRIPTION} css={{ paddingTop: 240 }}>
            <ButtonLink priority="secondary" href="/" css={{ marginTop: "2em" }}>
                Go Home
            </ButtonLink>
        </Page>
    );
}
