/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingIncludes: {
      "/api/preview": ["./node_modules/vscode-oniguruma/**/*"],
    },
  },
};

module.exports = nextConfig;
