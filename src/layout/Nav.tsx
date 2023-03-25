import { styled } from "@/theme";

import { animationStyles, pop } from "@/commons/animations";

import { Hide, Show } from "@/components/layout";
import { Heading, Span } from "@/components/ui";

import Menu from "@/components/nav/Menu";
import PageRoutes from "@/components/nav/PageRoutes";
import SocialRoutes from "@/components/nav/SocialRoutes";

export default function Nav() {
    return (
        <NavContainer>
            <NavLeft>
                <button
                    type="button"
                    aria-label="Scroll to top"
                    onClick={() =>
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        })
                    }
                >
                    <Heading as="h2" css={{ ...animationStyles, ...pop }}>
                        hexiro<Span color="brand-accent">.me</Span>
                    </Heading>
                </button>
                <PageRoutes />
            </NavLeft>
            <NavRight>
                <Hide below="sm">
                    <SocialRoutes />
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

    "@lg": {
        paddingX: "$main-x-padding-lg",
    },
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
