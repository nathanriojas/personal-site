/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next.js image optimization (responsive sizes + modern formats)
    // for better Largest Contentful Paint and Lighthouse scores.
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90, 100],
  },
}

export default nextConfig
