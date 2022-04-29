/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { locales: ["en"], defaultLocale: "en" }, // This config breaks middleware rewrites
};

module.exports = nextConfig;
