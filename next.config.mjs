/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // For static export if needed
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during build for faster deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors during build
  },
  // For Vercel deployment
  output: 'standalone', // Creates a standalone build for better compatibility
  // Disable barrel optimization to fix import issues
  experimental: {
    optimizePackageImports: [],
  },
}

export default nextConfig