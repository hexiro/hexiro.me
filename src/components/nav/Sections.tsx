import { styled } from "@/theme";

import { selectedSectionAtom } from "@/commons/atoms";
import { SECTIONS } from "@/commons/sections";

import { Hide, Show } from "@/components/layout";
import { ListItem } from "@/components/ui";

import Section from "@/components/nav/Section";

import { useAtomValue } from "jotai";

export default function Sections() {
    const currentSection = useAtomValue(selectedSectionAtom);
    const pageName = currentSection?.name ?? "Portfolio";

    return (
        <>
            <Hide below="sm">
                <UnorderedList>
                    {SECTIONS.map(({ name }) => (
                        <Section key={name} name={name} />
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
