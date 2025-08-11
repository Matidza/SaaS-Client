/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
};

module.exports = nextConfig;

