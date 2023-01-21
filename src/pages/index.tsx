import Page from "@/layout/Page";

const DESCRIPTION =
    "A self-taught software engineer who enjoys problem solving, technology, building software, and contributing to open source projects.";

export default function Home() {
    return (
        <Page name="Home" index={0} description={DESCRIPTION}>
            Home
        </Page>
    );
}
