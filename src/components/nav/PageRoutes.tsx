import { styled } from "@/theme";

import type { PageRouteType } from "@/commons/routes";
import { PAGE_ROUTES } from "@/commons/routes";

import { Hide, Show } from "@/components/layout";
import { ListItem } from "@/components/ui";

import PageRoute from "@/components/nav/PageRoute";

import {  motion } from "framer-motion";

interface RoutesProps {
    pageRouteIndex: number;
}

export default function Routes({ pageRouteIndex }: RoutesProps) {
    const pageRoute = PAGE_ROUTES[pageRouteIndex] as PageRouteType | undefined;
    const pageName = pageRoute?.name ?? "Portfolio";

    return (
        <>
            <Hide below="sm">
                <UnorderedList>
                    {PAGE_ROUTES.map(({ name, href }, index) => (
                        <PageRoute
                            key={name}
                            name={name}
                            href={href}
                            isSelected={pageRouteIndex === index}
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

const UnorderedList = styled(motion.ul, {
    display: "flex",
    flexDirection: "row",
    gap: "$2",
    width: "100%",

    "@lg": {
        gap: "$3",
    },
});
