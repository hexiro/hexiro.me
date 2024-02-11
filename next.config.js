const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    swcMinify: true,
    reactStrictMode: true,
    poweredByHeader: false,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    images: {
        remotePatterns: [
            // https://cdn.discordapp.com/avatars/...
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                pathname: "/avatars/**",
                port: "",
            },
            // https://cdn.discordapp.com/app-assets/...
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                pathname: "/app-assets/**",
                port: "",
            },
            // https://cdn.discordapp.com/embed/avatars/
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                pathname: "/embed/avatars/**",
                port: "",
            },
            // https://media.discordapp.net/external/...
            {
                protocol: "https",
                hostname: "media.discordapp.net",
                pathname: "/external/**",
                port: "",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ["src"],
    },
});
