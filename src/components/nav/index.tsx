import { styled } from "theme";

import { useState } from "react";

import Heading from "components/common/Heading";
import Span from "components/common/Span";
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
                <UnorderedList>
                    {routes.map((name) => (
                        <Route key={name} name={name} isSelected={name === selectedRoute} />
                    ))}
                </UnorderedList>
            </NavLeft>
        </NavContainer>
    );
}

const NavContainer = styled("nav", {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "25px 150px",
    borderBottom: "1px solid $lighten-10",
});

const NavLeft = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    // lineHeight: 1,
});

const UnorderedList = styled("ul", {
    display: "flex",
    flexDirection: "row",
    gap: "$3",
});
