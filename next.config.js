module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    webpack5: true,
    poweredByHeader: false,
    images: {
        domains: ["i.scdn.co", "cdn.discordapp.com", "avatars.githubusercontent.com"],
    },
    compiler: {
        styledComponents: process.env.NODE_ENV === "production" ? false : true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};
