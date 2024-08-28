import { ROUTES, TWITTER } from "@/commons/config";

import tailwindConfig from "../../tailwind.config";
import { NextSeo, DefaultSeo } from "next-seo";
import resolveConfig from "tailwindcss/resolveConfig";

interface SeoProps {
    readonly name: string;
    readonly description: string;
}

export function Seo({ name, description }: SeoProps) {
    const route = ROUTES.find((route) => route.name === name);
    if (!route) throw new Error(`Route not found for ${name}`);
    return (
        <NextSeo
            title={name}
            titleTemplate="NL // %s"
            description={description}
            canonical={`https://hexiro.me${route.path}`}
        />
    );
}

const fullConfig = resolveConfig(tailwindConfig);
// @ts-expect-error - tailwind config is unaware of the exact color name
const themeColor = fullConfig.theme?.colors.background.secondary as string;

export function GlobalSeo() {
    return (
        <DefaultSeo
            defaultTitle="NL"
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
            themeColor={themeColor}
            additionalLinkTags={[
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/favicon-32x32.png?v=2",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: "/favicon-16x16.png?v=2",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/apple-touch-icon.png?v=2",
                    sizes: "180x180",
                },
                {
                    rel: "mask-icon",
                    href: "/safari-pinned-tab.svg?v=2",
                    color: themeColor,
                },
                {
                    rel: "manifest",
                    href: "/site.webmanifest?v=2",
                },
            ]}
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
                    content: "Nathan Lodge, Software Engineer, Hexiro, Hexiiro, Hex, Hexiro.me",
                },
                {
                    name: "msapplication-TileColor",
                    content: themeColor,
                },
            ]}
        />
    );
}
