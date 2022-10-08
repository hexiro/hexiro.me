import type { PropsWithChildren } from "react";

import { Container } from "@chakra-ui/react";

import { TWITTER } from "commons/config";
import { DefaultSeo } from "next-seo";
import theme from "theme";

type PageProps = PropsWithChildren<{
    name: string;
    description: string;
}>;

export const Page = ({ name, description, children }: PageProps): JSX.Element => (
    <>
        <DefaultSeo
            description={description}
            title={name}
            titleTemplate="Hexiro | %s"
            defaultTitle="Hexiro"
            canonical="https://hexiro.me/"
            openGraph={{
                type: "website",
                locale: "en_US",
                url: "https://hexiro.me/",
                site_name: "hexiro.me",
            }}
            twitter={{
                handle: `@${TWITTER}`,
                site: `@${TWITTER}`,
                cardType: "summary_large_image",
            }}
            additionalMetaTags={[
                {
                    name: "application-name",
                    content: "Hexiro",
                },
                {
                    name: "apple-mobile-web-app-title",
                    content: "Hexiro",
                },
                {
                    name: "keywords",
                    content: "Hexiro, Hexiiro, Hex, Hexiro.me",
                },
                {
                    name: "theme-color",
                    content: theme.colors.brand.primary,
                },
                {
                    name: "msapplication-TileColor",
                    content: theme.colors.background.primary,
                },
                {
                    httpEquiv: "x-ua-compatible",
                    content: "ie=edge; chrome=1",
                },
            ]}
            additionalLinkTags={[
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: "/favicon-16x16.png",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/apple-touch-icon.png",
                    sizes: "180x180",
                },
                {
                    rel: "mask-icon",
                    href: "/safari-pinned-tab.svg",
                    color: theme.colors.brand.primary,
                },
                {
                    rel: "manifest",
                    href: "/manifest.json",
                },
            ]}
        />

        <Container height="100vh" maxWidth="64%" padding="unset">
            {children}
        </Container>
        {/* <Footer oneScreen={oneScreen} /> */}
    </>
);
