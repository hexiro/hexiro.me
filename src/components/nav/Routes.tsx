import { styled } from "@/theme";

import { ROUTES } from "@/commons/sections";

import { Hide, Show } from "@/components/layout";
import { ListItem } from "@/components/ui";

import Route from "@/components/nav/Route";

import useNavState from "@/hooks/useNavState";

export default function Routes() {
    const { selectedIndex, isHome } = useNavState();

    const pageName = ROUTES[selectedIndex]?.name ?? "Portfolio";

    return (
        <>
            <Hide below="sm">
                <UnorderedList>
                    {ROUTES.map(({ name }, index) => (
                        <Route
                            key={name}
                            name={name}
                            isSelected={isHome && index === selectedIndex}
                        />
                    ))}
                </UnorderedList>
            </Hide>
            <Show below="sm">
                <ListItem as="p">{pageName}</ListItem>
            </Show>
        </>
    );
}

const UnorderedList = styled("ul", {
    display: "flex",
    flexDirection: "row",
    gap: "$2",
    width: "100%",

    "@lg": {
        gap: "$3",
    },
});
