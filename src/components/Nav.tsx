import { styled } from "theme";

import Heading from "components/Heading";
import Link from "components/Link";
import ListItem from "components/ListItem";
import Span from "components/Span";

interface NavProps {
    routes: string[];
}

export default function Nav({ routes }: NavProps) {
    return (
        <NavContainer>
            <NavLeft>
                <Heading as="h2">
                    hexiro<Span color="brand-accent">.me</Span>
                </Heading>
                <UnorderedList>
                    {routes.map((name) => (
                        <ListItem key={name} style={{ textTransform: "capitalize" }}>
                            <Link href={`/${name.toLowerCase()}`}>{name}</Link>
                        </ListItem>
                    ))}
                </UnorderedList>
            </NavLeft>
        </NavContainer>
    );
}

const NavContainer = styled("nav", {
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
