/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@azure/storage-blob"],
  },
  env: {
    USE_STENCIL_COMPONENTS: process.env.USE_STENCIL_COMPONENTS || 'false',
    ENABLE_OTEL_TRACING: process.env.ENABLE_OTEL_TRACING || 'false',
    ENABLE_APIM_ROUTING: process.env.ENABLE_APIM_ROUTING || 'false',
  },
};

module.exports = nextConfig;
