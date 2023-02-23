import { styled } from "@/theme";

import { Hide, Show } from "@/components/layout";
import { Heading, Span } from "@/components/ui";

import Menu from "@/components/nav/Menu";
import Routes from "@/components/nav/Routes";
import Socials from "@/components/nav/Socials";

export default function Nav() {
    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <Routes />
            </NavLeft>
            <NavRight>
                <Hide below="sm">
                    <Socials />
                </Hide>
                <Show below="sm">
                    <Menu />
                </Show>
            </NavRight>
        </NavContainer>
    );
}

const NavContainer = styled("nav", {
    display: "flex",
    position: "fixed",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxHeight: "$nav-height",
    paddingY: "$main-y-padding",
    paddingX: "$main-x-padding",
    borderBottom: "2px solid $lighten-10",
    boxShadow: "0 4px 20px 10px rgb(0 0 0 / 10%)",
    backgroundColor: "$background-primary",
    zIndex: "$above",
});

const NavLeft = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: "$4",
});

const NavRight = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "auto",
    paddingLeft: "$4",
});
