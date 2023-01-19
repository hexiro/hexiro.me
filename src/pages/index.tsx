import { styled } from "theme";

import Nav from "components/nav";

export default function Home() {
    return (
        <Page>
            <Nav routes={["Home", "Projects", "Skills", "Dashboard"]} />
        </Page>
    );
}

const Page = styled("main", {
    height: "100%",
    width: "100%",
    minHeight: "100vh",
    minWidth: "100vw",
});
