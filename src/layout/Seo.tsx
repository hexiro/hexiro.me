import { TWITTER } from "@/commons/config";

import { NextSeo, DefaultSeo } from "next-seo";

interface SeoProps {
    name: string;
    description: string;
}

export function Seo({ name, description }: SeoProps) {
    return <NextSeo title={name} titleTemplate="NL // %s" description={description} />;
}

export function GlobalSeo() {
    return (
        <DefaultSeo
            defaultTitle="NL"
            canonical="https://hexiro.me/"
            openGraph={{
                type: "website",
                locale: "en_US",
                url: "https://hexiro.me/",
                siteName: "hexiro.me",
            }}
            twitter={{
                handle: `@${TWITTER}`,
                site: `@${TWITTER}`,
                cardType: "summary_large_image",
            }}
            // themeColor={themeColor}
            additionalMetaTags={[
                {
                    name: "application-name",
                    content: "NL",
                },
                {
                    name: "apple-mobile-web-app-title",
                    content: "NL",
                },
                {
                    name: "keywords",
                    content: "Nathan Lodge, Hexiro, Hexiiro, Hex, Hexiro.me",
                },
                // {
                //     name: "theme-color",
                //     content: themeBackground,
                // },
                // {
                //     name: "msapplication-TileColor",
                //     content: themeBackground,
                // },
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
                // {
                //     rel: "mask-icon",
                //     href: "/safari-pinned-tab.svg",
                //     color: themeColor,
                // },
                {
                    rel: "manifest",
                    href: "/manifest.json",
                },
            ]}
        />
    );
}
