import React from "react";

import { Twitter } from "static/config";
import theme from "static/theme";

import { DefaultSeo } from "next-seo";

interface PageProps {
    name: string;
    description: string;
    children?: React.ReactNode;
}

export default function Page({ name, description, children }: PageProps): JSX.Element {
    return (
        <>
            <DefaultSeo
                description={description}
                title={name}
                titleTemplate="%s | Hexiro"
                defaultTitle="Page | Hexiro"
                canonical="https://hexiro.me/"
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://hexiro.me/",
                    site_name: "hexiro.me",
                }}
                twitter={{
                    handle: `@${Twitter}`,
                    site: `@${Twitter}`,
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
                        content: theme.accent.main,
                    },
                    {
                        name: "msapplication-TileColor",
                        content: theme.core.background,
                    },
                    {
                        httpEquiv: "x-ua-compatible",
                        content: "ie=edge; chrome=1",
                    },
                ]}
                additionalLinkTags={[
                    {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                    },
                    {
                        rel: "stylesheet",
                        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&amp;display=swap",
                    },
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
                        color: theme.accent.main,
                    },
                    {
                        rel: "manifest",
                        href: "/manifest.json",
                    },
                ]}
            />
            {children}
            <noscript>
                <style
                    dangerouslySetInnerHTML={{
                        __html: "*[style*='opacity:0']{opacity:1!important;}",
                    }}
                />
            </noscript>
        </>
    );
}
