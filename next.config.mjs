/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ['rickandmortyapi.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'rickandmortyapi.com',
          port: '',
          pathname: '/api/character/avatar/**',
        },
      ],
      unoptimized: true,
    },
    experimental: {
      optimizePackageImports: ['lucide-react'],
    },
  }
  
  export default nextConfig
  