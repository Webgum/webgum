/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"],
  },
  swcMinify: true,
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
