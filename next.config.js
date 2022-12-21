/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ipfs.w3s.link',
      },
    ],
  },
  swcMinify: true,
  experimental: {
    esmExternals: false,
  },
}

module.exports = nextConfig
