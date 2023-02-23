import { styled } from "@/theme";

import { selectedSectionAtom } from "@/commons/atoms";
import { PAGE_ROUTES } from "@/commons/routes";

import { Hide, Show } from "@/components/layout";
import { ListItem } from "@/components/ui";

import Route from "@/components/nav/Route";

import { useAtomValue } from "jotai";

export default function Routes() {
    const currentSection = useAtomValue(selectedSectionAtom);
    const pageName = currentSection?.name ?? "Portfolio";

    return (
        <>
            <Hide below="sm">
                <UnorderedList>
                    {PAGE_ROUTES.map(({ name }) => (
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
