import { selectedRouteIndexAtom } from "@/commons/atoms";

import { useAtom } from "jotai";

export default function useNavSectionIsSelected(index: number | null): boolean {
    const [selectedRouteIndex] = useAtom(selectedRouteIndexAtom);

    if (index === null) return false;

    return selectedRouteIndex === index;
}
