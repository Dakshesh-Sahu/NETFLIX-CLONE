import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      // Add other image sources if needed, e.g., TMDB
      // {
      //   protocol: 'https',
      //   hostname: 'image.tmdb.org',
      //   port: '',
      //   pathname: '/t/p/**',
      // },
    ],
  },
};

export default nextConfig;