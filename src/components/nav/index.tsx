import { styled } from "theme";

import { useState } from "react";

import Heading from "components/common/Heading";
import Span from "components/common/Span";
import Hide from "components/layout/Hide";
import Route from "components/nav/Route";

interface NavProps {
    routes: string[];
}

export default function Nav({ routes }: NavProps) {
    const [selectedRoute, setSelectedRoute] = useState(routes[0]);

    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <Hide below="sm">
                    <UnorderedList>
                        {routes.map((name) => (
                            <Route key={name} name={name} isSelected={name === selectedRoute} />
                        ))}
                    </UnorderedList>
                </Hide>
            </NavLeft>
            <NavRight>
                <Heading as="h3">Hello, world!</Heading>
            </NavRight>
        </NavContainer>
    );
}

const NavContainer = styled("nav", {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingY: 25,
    paddingX: "min(10%, 150px)",
    borderBottom: "1px solid $lighten-10",
});

const NavLeft = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

const NavRight = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: "auto"
});

const UnorderedList = styled("ul", {
    display: "flex",
    flexDirection: "row",
    gap: "$2",
    width: "100%",

    "@lg": {
        gap: "$3",
    },
});
