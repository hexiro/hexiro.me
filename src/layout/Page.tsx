import { styled } from "@/theme";

import type { PropsWithChildren } from "react";

import SEO from "@/layout/SEO";

interface PageProps {
    name: string;
    description: string;
}

export default function Page({ name, description, children }: PropsWithChildren<PageProps>) {
    return (
        <>
            <SEO name={name} description={description} />
            <Main>{children}</Main>
        </>
    );
}

const Main = styled("main", {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
    paddingY: "$main-y-padding",
    paddingX: "$main-x-padding",
});
