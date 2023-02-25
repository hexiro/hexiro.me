import { styled } from "@/theme";

import { PAGE_ROUTES } from "@/commons/routes";

import { Hide, Show } from "@/components/layout";
import { ListItem } from "@/components/ui";

import PageRoute from "@/components/nav/PageRoute";

import usePageRoute from "@/hooks/usePageRoute";

import { motion } from "framer-motion";

export default function Routes() {
    const pageRoute = usePageRoute();
    const pageName = pageRoute?.name ?? "Portfolio";

    return (
        <>
            <Hide below="sm">
                <UnorderedList>
                    {PAGE_ROUTES.map(({ name, href }, index) => (
                        <PageRoute key={name} name={name} href={href} />
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
