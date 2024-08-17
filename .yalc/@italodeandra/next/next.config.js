const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                mongodb: false,
                crypto: false,
                jsonwebtoken: false,
                bson: false,
                nodemailer: false,
                mailgen: false,
                fs: false,
                sharp: false,
                papr: false,
                "mongodb-memory-server": false,
                "@adiwajshing/baileys": false,
                "@hapi/boom": false,
                minio: false,
                openai: false,
                "mime-types": false,
                "@react-email": false,
                "open-graph-scraper": false,
                "playwright-core": false,
            };
        }
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
                pathname: "**",
            },
        ],
    },
    transpilePackages: ["@italodeandra/auth", "@italodeandra/ui"],
    experimental: {
        optimizePackageImports: [
            "@italodeandra/next",
            "@italodeandra/ui",
            "@italodeandra/auth",
        ],
    },
};
export default nextConfig;
