import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: '',
        pathname: '/media/**', // Autoriser toutes les images sous /media/
      },
    ],
  },
};

export default nextConfig;
