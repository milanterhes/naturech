/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui, @naturechill/tailwind-config"],
  i18n: {
    locales: ["default", "hu", "de", "en"],
    defaultLocale: "default",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/hu",
      },
    ];
  },
  trailingSlash: true,
};
