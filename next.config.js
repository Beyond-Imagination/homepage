/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/member': { page: '/member' },
      '/projects': { page: '/projects' },
      '/history': { page: '/history' },
      '/photo': { page: '/photo' },
    }
  },
}

module.exports = nextConfig
