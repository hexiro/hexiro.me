import type { RouteName } from "@/commons/sections";

import useIsSectionInView from "@/hooks/useIsSectionInView";

import type { MenuItemProps } from "components/nav/MenuItem";
import MenuItem from "components/nav/MenuItem";

type SectionMenuItemProps = Omit<MenuItemProps, "highlighted"> & {
    name: RouteName;
};

export default function SectionMenuItem({ name, ...props }: SectionMenuItemProps) {
    const coloredIcon = useIsSectionInView(name);
    return <MenuItem name={name} coloredIcon={coloredIcon} {...props} />;
}
