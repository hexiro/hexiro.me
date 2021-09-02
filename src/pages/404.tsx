import { Error, Page } from "components";

export default function NotFound() {
    const description = "Oops? This page couldn't be found!";
    return (
        <Page name="404" description={description}>
            <Error status="404" message={description} />,
        </Page>
    );
}
