/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Optional static export for GitHub Pages deployment
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
