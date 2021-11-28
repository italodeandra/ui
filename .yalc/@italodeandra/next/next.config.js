const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const smtp = {
  from: process.env.SMTP_FROM,
  server: {
    auth: {
      pass: process.env.SMTP_PASS,
      user: process.env.SMTP_USER,
    },
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT && parseInt(process.env.SMTP_PORT),
  },
};

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        mongodb: false,
        "mongodb-memory-server": false,
        "socket.io": false,
        nodemailer: false,
        mailgen: false,
      };
    }
    return config;
  },
  serverRuntimeConfig: {
    appEnv: process.env.APP_ENV || "development",
    mongodbUri: process.env.MONGODB_URI,
    smtp,
    nextAuth: {
      url: process.env.NEXTAUTH_URL,
      debug: process.env.NEXTAUTH_DEBUG === "true",
      providerEmail: smtp,
    },
    product: {
      name: "Majapi",
      link: "https://majapi.com.br/",
      logo: "https://majapi.com.br/majapinho.png",
      copyright: `&copy; ${new Date().getFullYear()} <a href="https://majapi.com.br/" target="_blank">Majapi</a>. Todos os direitos reservados.`,
    },
    s3: {
      endPoint: process.env.S3_ENDPOINT,
      useSSL: process.env.S3_USE_SSL === "true",
      accessKey: process.env.S3_ACCESS_KEY,
      secretKey: process.env.S3_SECRET_KEY,
      bucketName: process.env.S3_BUCKET_NAME,
      region: process.env.S3_REGION,
    },
  },
};

module.exports = withBundleAnalyzer(config);
