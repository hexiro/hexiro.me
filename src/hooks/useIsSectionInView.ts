import { selectedSectionAtom } from "@/commons/atoms";
import type { SectionName } from "@/commons/sections";

import { useAtom } from "jotai";

export default function useIsSectionInView(sectionName: SectionName) {
    const [selectedSection] = useAtom(selectedSectionAtom);

    return selectedSection?.name === sectionName;
}
