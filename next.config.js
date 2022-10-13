/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        mongodb: false,
        bson: false,
        papr: false,
        "mongodb-memory-server": false,
        jsonwebtoken: false,
        crypto: false,
        nodemailer: false,
        mailgen: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
