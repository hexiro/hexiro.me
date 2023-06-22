const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    swcMinify: true,
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        domains: [
            "cdn.discordapp.com",
            "media.discordapp.net",
            "avatars.githubusercontent.com",
            "www.themoviedb.org",
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
        dirs: ["src"],
    },
});
