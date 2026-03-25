import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Дозволяє завантаження з будь-яких HTTPS ресурсів
      },
    ],
  },
};

export default nextConfig;
