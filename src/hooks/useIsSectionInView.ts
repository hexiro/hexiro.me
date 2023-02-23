import { selectedSectionAtom } from "@/commons/atoms";
import type { PageRouteName } from "@/commons/routes";

import { useAtom } from "jotai";

export default function useIsSectionInView(sectionName: PageRouteName) {
    const [selectedSection] = useAtom(selectedSectionAtom);
    return selectedSection.name === sectionName;
}
