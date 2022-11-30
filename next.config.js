const nextTranslate = require("next-translate");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"],
  },
};

module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  ...nextConfig,
});
