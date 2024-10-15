/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || "https://hexiro.me",
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: "weekly",
};
