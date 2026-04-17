import type { NextConfig } from 'next';

export const nextConfigImage: NextConfig['images'] = {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'hub.haeahn.com',
    //     pathname: '/Storage/**',
    //   },
    // ],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.haeahn.com',
        pathname: '/Storage/**',
      },
    ],
};