import type { NextConfig } from "next";

import path, { resolve } from 'path';
import { config } from 'dotenv';

const isProd = process.env.NODE_ENV === 'production';

console.log('process.cwd()', process.cwd())


// 프로젝트경로/.env 를 사용할 경우
// loadEnvConfig(process.cwd());

config({
  path: isProd
    ? path.resolve(process.cwd(), 'environment/.env.production')
    : path.resolve(process.cwd(), 'environment/.env.development'),
});

// // path 대체 - 현재 dir 경로
// const __dirname = path.resolve();
// // env 경로 설정
// if (`${process.env.NODE_ENV}` === 'development') {
//   config({ path: path.join(__dirname, '/environment/.env.development') });
// } else {
//   config({ path: path.join(__dirname, '/environment/.env.production') });
// }


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  /**
   * https://nextjs.org/docs/app/api-reference/config/next-config-js/output
   * outputFileTracingIncludes: 특정 파일만 추적하도록 설정 - standalone으로 빌드한 artifact에 포함
   */
  // e.g.
  // outputFileTracingIncludes: {
  //   '/api/another': ['./necessary-folder/**/*'],
  //   '/api/login/\\[\\[\\.\\.\\.slug\\]\\]': [
  //     './node_modules/aws-crt/dist/bin/**/*',
  //   ],
  // },

  // outputFileTracingIncludes: {
  //   '/': [
  //     './node_modules/pino-pretty/**/*',
  //     './node_modules/pino-roll/**/*'
  //   ],
  // },
  serverExternalPackages: ['pino', 'pino-roll'],

  // rewrites
  async rewrites() {
    return [
      {
        source: '/hub/:path*',
        destination: `${process.env.NEXT_PUBLIC_HUB_URL}/:path*`,
      },
    ];
  },

};

export default nextConfig;
