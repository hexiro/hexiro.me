import { styled } from "@/theme";

import { ROUTES } from "@/commons/sections";

import { Hide, Show } from "@/components/layout";
import { ListItem } from "@/components/ui";

import Route from "@/components/nav/Route";

import useCurrentSectionInView from "@/hooks/useCurrentSectionInView";

export default function Routes() {
    const currentSection = useCurrentSectionInView();
    const pageName = currentSection?.name ?? "Portfolio";

    return (
        <>
            <Hide below="sm">
                <UnorderedList>
                    {ROUTES.map(({ name }) => (
                        <Route key={name} name={name} />
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
