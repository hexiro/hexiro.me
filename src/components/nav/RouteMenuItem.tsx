import type { PageRouteName } from "@/commons/routes";

import useIsSectionInView from "@/hooks/useIsSectionInView";

import type { MenuItemProps } from "components/nav/MenuItem";
import MenuItem from "components/nav/MenuItem";

type SectionMenuItemProps = Omit<MenuItemProps, "highlighted"> & {
    name: PageRouteName;
};

export default function SectionMenuItem({ name, ...props }: SectionMenuItemProps) {
    const coloredIcon = useIsSectionInView(name);
    return <MenuItem name={name} coloredIcon={coloredIcon} {...props} />;
}
