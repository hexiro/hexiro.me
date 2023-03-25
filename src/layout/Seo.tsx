import { config } from "@/theme";

import { TWITTER } from "@/commons/config";

import { NextSeo, DefaultSeo } from "next-seo";

interface SeoProps {
    name: string;
    description: string;
}

export function Seo({ name, description }: SeoProps) {
    return <NextSeo title={name} titleTemplate="Hexiro | %s" description={description} />;
}

export function GlobalSeo() {
    return (
        <DefaultSeo
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
            themeColor={config.theme.colors["brand-primary"]}
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
                    content: config.theme.colors["background-primary"],
                },
                {
                    name: "msapplication-TileColor",
                    content: config.theme.colors["background-primary"],
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
                    color: config.theme.colors["brand-primary"],
                },
                {
                    rel: "manifest",
                    href: "/manifest.json",
                },
            ]}
        />
    );
}
