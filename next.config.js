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
      '/projects/1KYfO74OsnYhtvYu3eGxMW': { page: '/projects/[id]' },
      '/projects/47NFeqbbG1Um9QA16NKCGf': { page: '/projects/[id]' },
      '/projects/1GjM4jl6OYYfXNKxLnpZMz': { page: '/projects/[id]' },
      '/projects/fH0mB7CwtNyb6q7aMeFrH': { page: '/projects/[id]' },
      '/projects/7qu1adrZHMfGnrnRQfdBx4': { page: '/projects/[id]' },
      '/history': { page: '/history' },
      '/photo': { page: '/photo' },
    }
  },
}

module.exports = nextConfig
