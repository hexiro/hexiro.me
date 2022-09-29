const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    swcMinify: true,
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
        domains: ["cdn.discordapp.com", "avatars.githubusercontent.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
});
