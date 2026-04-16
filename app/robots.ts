// robots.txt 파일 자동생성
import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            disallow: '*',
        },
    }
}
// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: '/private/',
//     },
//     sitemap: 'https://acme.com/sitemap.xml',
//   }
// }