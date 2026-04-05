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
}

export default nextConfig