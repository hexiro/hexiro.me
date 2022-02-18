module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    webpack5: true,
    poweredByHeader: false,
    images: {
        domains: ["i.scdn.co", "cdn.discordapp.com", "avatars.githubusercontent.com"],
    },
    compiler: {
        styledComponents: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};
