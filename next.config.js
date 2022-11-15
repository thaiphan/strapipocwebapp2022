/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["orca-app-lu9m7.ondigitalocean.app"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
